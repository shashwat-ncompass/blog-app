import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users.entity';
import { UserCredential } from 'src/typeorm/entities/user_credentials.entity';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User,
      UserCredential,
      UserRole
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
