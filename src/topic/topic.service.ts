import {
  Injectable,
  NotFoundException,
  ForbiddenException, Inject,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../typeorm/entities/topic.entity';
import { CreateTopicDto } from 'src/topic/dtos/topic.dto';
import { User } from '../typeorm/entities/users.entity';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { GetTopicDto } from './dtos/getTopics.dto';
import { assignTopicRoleParams } from './types/assignTopicRole';
import { customError } from 'src/utils/exceptionHandler';
import { GetTopicByIdDto } from './dtos/getTopicsById.dto';
import { UserTopic } from 'src/typeorm/entities/user_topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(UserTopic)
    private readonly userTopicRepository: Repository<UserTopic>
  ) { }

  async createTopic(
    userId: string,
    createTopicDto: CreateTopicDto,
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return new customError(
          HttpStatus.UNAUTHORIZED,
          'Invalid Credentials',
          'User not found',
        );
      }
      const createTopicResponse = await this.topicRepository.save(createTopicDto);
      return createTopicResponse
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async getTopics(userId: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return new customError(404, "Some Error Occured", 'User not found');
      }
      
      const topics = await this.topicRepository.find();
      const getTopicDtos: GetTopicDto[] = topics.map(topic => ({
        id: topic.id,
        name: topic.name,
        description: topic.description,
        ownerId: topic.ownerId,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
      }));
      return getTopicDtos;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async assignTopicRole(assignTopicRoleParams: assignTopicRoleParams) {
    try {
      const userTopicDetails = this.userTopicRepository.create({
        userId: assignTopicRoleParams.userId,
        [assignTopicRoleParams.role]: true,
        topicId: assignTopicRoleParams.topicDetails
      })
      const assignTopicViewerResponse = await this.userTopicRepository
        .save({
          ...userTopicDetails
        }).then((user) => {
          return user;
        });
      return assignTopicViewerResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async getTopicById(userId: string, topicId: string): Promise<any> {
    // Check if the user has access to the topic\
    try {
      const userTopic = await this.userTopicRepository.findOne({
        where: {
          topicId,
          userId,
        },
      })

      if (!userTopic || (!userTopic.editor && !userTopic.viewer)) {
        return new customError(403, "Some Error Occured", 'User does not have permission to view this topic');
      }

      // Fetch topic by ID
      const topic = await this.topicRepository.findOne({
        where: {
          id: topicId
        }
      });

      if (!topic) {
        return new customError(403, "Some Error Occured", 'Topic Not Found');
      }

      return topic;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }
}
