import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/typeorm/entities/users.entity';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  providers: [UserService, JwtService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
