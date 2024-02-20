import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Next,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { UserService } from './user.service';
import { ApiResponse } from 'src/utils/apiResponse';
import { customError } from 'src/utils/exceptionHandler';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { Role } from 'src/auth/enums';
import { assignRoleDto } from 'src/auth/dtos/assignRole.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HasRoles(Role.VIEWER)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  async getProfile(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userId = req['user']['userId'];
      if (userId != id) {
        throw new customError(
          HttpStatus.FORBIDDEN,
          'Some Error Occured',
          'Access Denied',
        );
      }
      const findAuthorByIdResponse = await this.userService.findUserById(id);
      if (findAuthorByIdResponse instanceof customError) {
        throw findAuthorByIdResponse;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Data Fetched Successfully',
        findAuthorByIdResponse['userProfileResponse'],
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  @HasRoles(Role.SUPERADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('assign-role')
  async assignUserRole(
    @Body() assignRoleDto: assignRoleDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const assignUserRoleResponse =
        await this.userService.assignUserRole(assignRoleDto);
      if (assignUserRoleResponse instanceof customError) {
        throw assignUserRoleResponse;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Role Assigned Successfully',
        assignUserRoleResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}
