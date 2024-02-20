import {
  Body,
  Controller,
  HttpStatus,
  HttpException,
  Next,
  Post,
  Res,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Response } from 'express';

import { createUserDto } from './dtos/createUser.dto';
import { createUserPasswordDetailsDto } from './dtos/createUserPassword.dto';
import { AuthService } from './auth.service';
import { customError } from 'src/utils/exceptionHandler';
import { ApiResponse } from 'src/utils/apiResponse';
import { encrypt } from 'src/utils/encrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async createUser(
    @Body() createUserDto: createUserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      createUserDto['id'] = uuidv4();

      const encryptedPassword = encrypt(createUserDto['password']);
      const createUserPassword: createUserPasswordDetailsDto = {
        id: createUserDto.id,
        password: encryptedPassword,
      };
      delete createUserDto.password;
      const createUserResponse = await this.authService.createUser(
        createUserDto,
        createUserPassword,
      );
      if (createUserResponse instanceof customError) {
        throw createUserResponse;
      }
      return new ApiResponse(
        HttpStatus.FOUND,
        'User Created Successfully',
        createUserResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const user = await this.authService.validateUser(
        body.email,
        body.password,
      );
      if (!user)
        throw new customError(
          HttpStatus.UNAUTHORIZED,
          'Invalid credentials',
          'User not found or invalid password',
        );

      const tokenResponse = await this.authService.login(body.email, body.password);
      if (tokenResponse instanceof customError) {
        throw tokenResponse
      }
      return new ApiResponse(HttpStatus.OK, 'Login successful', tokenResponse, res);
    } catch (error) {
      next(
        error,
      );
    }
  }
}
