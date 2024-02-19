import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { customError } from 'src/utils/exceptionHandler';
import { Blog } from 'src/typeorm/entities/blog.entity';
import { UserTopic } from 'src/typeorm/entities/user_topic.entity';
import { TopicBlog } from 'src/typeorm/entities/topic_blog.entity';
import { createBlog } from './dtos/createBlog.dto';

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(Blog) private blogRepository: Repository<Blog>,
        @InjectRepository(UserTopic) private userTopicsRepository: Repository<UserTopic>
    ) { }

    async createBlog(userId: string, topicId: string, createBlog: createBlog): Promise<any> {
        try {
            const user = await this.userTopicsRepository.findOne({
                where: {
                    topicId: topicId,
                    userId: userId,
                    editor: true
                }
            });
            const createBlogInstance = this.blogRepository.create({
                id: createBlog.id,
                name: createBlog.name,
                description: createBlog.desc,
                ownerId: user,
                header: createBlog.header,
                footer: createBlog.footer,
                body: createBlog.body,
            })

            if (!user)
                return new customError(HttpStatus.UNAUTHORIZED, "User not authorized", "Cannot access");

            return await this.blogRepository.save(createBlogInstance);
        }
        catch (error) {
            throw new customError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error in saving the blog', error.message);
        }

    }

    async editBlog(userId: string, blogId: string, fieldToUpdate: keyof createBlog, updatedValue: string): Promise<any> {
        try {
            const blogEntry = await this.blogRepository.findOne({
                where: { id: blogId }
            });

            if (!blogEntry || blogEntry.ownerId.id == userId) {
                throw new customError(HttpStatus.UNAUTHORIZED, "User not authorized", "Cannot access");
            }

            const updateData = { [fieldToUpdate]: updatedValue };
            const editResult = await this.blogRepository.update({ id: blogId }, updateData);
            return editResult;
        }
        catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, "Error in updating the blog", error.message);
        }
    }

    async deleteBlog(userId: string, blogId: string): Promise<any> {
        try {
            const blogEntry = await this.blogRepository.findOne({
                where: { id: blogId }
            });

            if (!blogEntry || blogEntry.ownerId.id == userId) {
                throw new customError(HttpStatus.UNAUTHORIZED, "User not authorized", "Cannot access");
            }
            const archiveResult = await this.blogRepository.update({ id: blogId }, { isArchive: true });
            return archiveResult;
        }
        catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, "Error in updating the blog", error.message);
        }
    }
}
