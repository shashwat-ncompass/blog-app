import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { createUserParams } from './types/createUserParams';
import { createUserPasswordParams } from './types/createUserPasswordParams';
import { User } from 'src/typeorm/entities/users.entity';
import { UserCredential } from 'src/typeorm/entities/user_credentials.entity';
import { customError } from 'src/utils/exceptionHandler';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { UserService } from 'src/user/user.service';
import { encrypt } from 'src/utils/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) { }
  @InjectRepository(User) private userRepository: Repository<User>;
  @InjectRepository(UserCredential)
  private userCredentialRepository: Repository<UserCredential>;
  @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>;

  async createUser(
    userDetails: createUserParams,
    userPasswordDetails: createUserPasswordParams,
  ) {
    try {
      const userRole = this.userRoleRepository.create({
        userId: userDetails.id,
      });
      const userCredential = this.userCredentialRepository.create({
        ...userPasswordDetails,
      });

      const createNewUserPasswordResponse = await this.userCredentialRepository
        .save(userCredential)

      const createUserRoleResponse = await this.userRoleRepository
        .save(userRole)

      const createNewUserResponse = await this.userRepository
        .save({
          ...userDetails,
          role_details: createUserRoleResponse,
          password_details: createNewUserPasswordResponse,
        })

      return createNewUserResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user)
        return new customError(
          HttpStatus.UNAUTHORIZED,
          'Invalid Credentials',
          'User not found',
        );

      const passwordHash = encrypt(password);
      const userCredential = await this.userCredentialRepository.findOne({
        where: { id: user.id },
      });

      if (!userCredential || passwordHash !== userCredential.password)
        return new customError(
          HttpStatus.FORBIDDEN,
          'Invalid Credentials',
          'Password mismatch',
        );

      return user;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.validateUser(email, password);
      if (user instanceof customError) {
        return user;
      }

      const rolesArray = await this.userService.findUserById(user.id);
      if (rolesArray instanceof customError) {
        return rolesArray;
      }
      const payload = {
        email: user.email,
        id: user.id,
        roles: rolesArray['roleArray'],
      };
      const token = await this.jwtService.signAsync(payload);
      return { token: token };
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Login Failed',
        error.message,
      );
    }
  }
}
