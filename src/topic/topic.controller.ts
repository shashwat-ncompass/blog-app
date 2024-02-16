//import { Controller } from '@nestjs/common';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Req,
  Res,
  Next,
  HttpStatus,
} from '@nestjs/common';
import { TopicsService } from './topic.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { CreateTopicDto } from './dtos/topic.dto';
import { GetTopicDto } from './dtos/getTopics.dto';
import { GetTopicByIdDto } from './dtos/getTopicsById.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { v4 as uuid } from 'uuid';
import { assignTopicRoleDto } from './dtos/assignTopicRole.dto';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from 'src/utils/apiResponse';
import { customError } from 'src/utils/exceptionHandler';
import { Repository } from 'typeorm';
import { Topic } from 'src/typeorm/entities/topic.entity';
import { InjectRepository } from '@nestjs/typeorm';

// @Controller('topic')
// export class TopicController {}

@UseGuards(JwtGuard, RolesGuard)
@Controller('topic')
export class TopicsController {

  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly jwtStrategy: JwtStrategy, // Inject JwtStrategy
    private readonly topicsService: TopicsService,
  ) { }

  @HasRoles(Role.ADMIN, Role.SUPERADMIN)
  @Post('create')
  async createTopic(
    @Req() req: Request,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    // const user = await this.jwtStrategy.validate(req.headers.authorization);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid token');
    // }

    const user = req.user;
    console.log(user);
    const id = uuid();
    createTopicDto.id = id;
    createTopicDto.ownerId = req['user']['userId'];

    return this.topicsService.createTopic(
      req['user']['userId'],
      createTopicDto,
    );
  }

  @HasRoles(Role.VIEWER)
  @Get()
  async getTopics(@Req() req: Request): Promise<GetTopicDto[]> {
    // Extract user ID from the user object
    //const userId = user.userId;
    const user = req.user;

    // Fetch topics based on user permissions
    return this.topicsService.getTopics(req['user']['userId']);
  }

  @HasRoles(Role.SUPERADMIN, Role.ADMIN)
  @Post('assign-role')
  async assignTopicRole(
    @Body() assignTopicRoleDto: assignTopicRoleDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const fetchOwnerId = await this.topicRepository
        .createQueryBuilder()
        .select()
        .where(`ID = :ID`, { ID: assignTopicRoleDto.topicDetails })
        .getOne()

      if (req['user']['userId'] != fetchOwnerId.ownerId) {
        throw new customError(
          HttpStatus.FORBIDDEN,
          'Some Error Occured',
          'Access denied',
        );
      }
      const assignRoleResponse = await this.topicsService.assignTopicRole(assignTopicRoleDto)
      if (assignRoleResponse instanceof customError) {
        throw assignRoleResponse;
      }
      return new ApiResponse(
        HttpStatus.FOUND,
        'Role Assigned Successfully',
        assignRoleResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}

