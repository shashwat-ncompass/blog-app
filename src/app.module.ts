import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Topic } from './typeorm/entities/topic.entity';
import { UserCredential } from './typeorm/entities/user_credentials.entity';
import { User } from './typeorm/entities/users.entity';
import { UserRole } from './typeorm/entities/user_roles.entity';
import { UserTopic } from './typeorm/entities/user_topic.entity';
import { BlogModule } from './blog/blog.module';
import { dbConfig } from './utils/db-config';

@Module({
  imports: [
    AuthModule,
    TopicModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    BlogModule,
    TypeOrmModule.forRootAsync(dbConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
