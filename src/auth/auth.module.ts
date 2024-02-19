import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { User } from 'src/typeorm/entities/users.entity';
import { UserCredential } from 'src/typeorm/entities/user_credentials.entity';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { UserService } from 'src/user/user.service';
import { jwtConfig } from 'src/utils/jwt-config';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserCredential, User, UserRole]),
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule { }
