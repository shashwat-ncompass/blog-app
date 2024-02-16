import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { User } from 'src/typeorm/entities/users.entity';
import { UserCredential } from 'src/typeorm/entities/user_credentials.entity';
import { jwtConstants } from './constants';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { UserService } from 'src/user/user.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserCredential,
      User,
      UserRole
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' }
    }),
  ],
  providers: [AuthService, UserService
  ],
  controllers: [AuthController]
})
export class AuthModule { }
