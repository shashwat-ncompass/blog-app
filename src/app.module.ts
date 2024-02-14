import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [AuthModule, TopicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
