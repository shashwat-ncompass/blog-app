import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { Blog } from 'src/typeorm/entities/blog.entity';
import { User } from 'src/typeorm/entities/users.entity';
import { UserTopic } from 'src/typeorm/entities/user_topic.entity';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { TopicBlog } from 'src/typeorm/entities/topic_blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog, UserTopic, UserRole, TopicBlog])],
  providers: [JwtStrategy, BlogService, UserService],
  controllers: [BlogController]
})
export class BlogModule {}
