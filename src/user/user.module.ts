import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule { }
