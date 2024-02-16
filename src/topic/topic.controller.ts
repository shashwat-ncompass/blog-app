//import { Controller } from '@nestjs/common';
import { Controller, Post, Body, Request, UseGuards,Get ,Param} from '@nestjs/common';
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
import {v4 as uuid} from "uuid"

// @Controller('topic')
// export class TopicController {}


@UseGuards(JwtGuard, RolesGuard)
@Controller('topic')
export class TopicsController {
  constructor(
    private readonly jwtStrategy: JwtStrategy, // Inject JwtStrategy
    private readonly topicsService: TopicsService,
  ) {}
  @HasRoles(Role.SUPERADMIN)
  @Post('/create')
  async createTopic(@Request() req, @Body() createTopicDto: CreateTopicDto) {
   
    // const user = await this.jwtStrategy.validate(req.headers.authorization);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid token');
    // }

    const user=req.user
    console.log(user)
    const id = uuid()
    createTopicDto.id = id
    createTopicDto.ownerId= req.user.userId
    
 
    return this.topicsService.createTopic(user.userId, createTopicDto);
  }

  @HasRoles(Role.VIEWER)
  @Get()
  async getTopics(@Request() req): Promise<GetTopicDto[]> {
    
    // Extract user ID from the user object
    //const userId = user.userId;
    const user=req.user
    
    // Fetch topics based on user permissions
    return this.topicsService.getTopics(user.userId);
  }
}


//   @Get(':id')
//   async getTopicById(@Request() req, @Param('id') id: number): Promise<GetTopicByIdDto[]> {
//     const token = req.headers.authorization;
//     if (!token) {
//       throw new UnauthorizedException('Missing authorization token');
//     }

//     // Validate JWT token
//     const user = await this.jwtStrategy.validate(token);
//     if (!user) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     // Extract user ID from the user object
//     const userId = user.userId;
    
//     // Fetch topic by ID
//     return this.topicsService.getTopicById(userId, id);
// }


