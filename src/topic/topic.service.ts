import {
  Injectable,
  NotFoundException,
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
import { UserTopic } from 'src/typeorm/entities/user_topic.entity';
import { customError } from 'src/utils/exceptionHandler';

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

  async getTopics(userId: string): Promise<GetTopicDto[]> {
    // Fetch user details along with user role
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user is a viewer, admin, or superadmin
    // if (user.role_details.viewer || user.role_details.admin || user.role_details.superAdmin) {
    // Fetch topics if user has appropriate permissions
    const topics = await this.topicRepository.find();
    //return topics.map(topic => ({ name: topic.name, description: topic.description }));
    const getTopicDtos: GetTopicDto[] = topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      ownerId: topic.ownerId,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
    }));
    return getTopicDtos;

    // } else {
    //   throw new ForbiddenException('User does not have permission to view topics');
    // }
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
}
