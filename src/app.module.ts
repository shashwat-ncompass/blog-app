import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';
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
