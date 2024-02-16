import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  providers: [UserService, JwtService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
