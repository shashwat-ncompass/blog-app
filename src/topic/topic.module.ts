import { Module } from '@nestjs/common';
import { TopicsService } from './topic.service';
import { TopicsController } from './topic.controller';
import { Topic } from 'src/typeorm/entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/typeorm/entities/users.entity';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserTopic } from 'src/typeorm/entities/user_topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Topic, UserTopic])], // Import TypeOrmModule and specify the entities to be used
  controllers: [TopicsController],
  providers: [JwtStrategy, TopicsService, UserService],
})
export class TopicModule { }
