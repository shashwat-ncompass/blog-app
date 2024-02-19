import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    AuthModule,
    TopicModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Topic, UserCredential, User, UserRole, UserTopic],
        synchronize: true,
      }),
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
