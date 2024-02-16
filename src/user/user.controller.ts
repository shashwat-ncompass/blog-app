import { Controller, Get, HttpStatus, Next, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/utils/apiResponse';
import { customError } from 'src/utils/exceptionHandler';
import { NextFunction, Request, Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { Role } from 'src/auth/enums';




@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @HasRoles(Role.VIEWER)
    @UseGuards(JwtGuard, RolesGuard)
    @Get(':id')
    async getProfile(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        try {
            const userId = req['user']['userId']
            if (userId != id) {
                throw (new customError(HttpStatus.FORBIDDEN, "Some Error Occured", "Access Denied"))
            }
            const findAuthorByIdResponse = await this.userService.findUserById(id);
            return (new ApiResponse(HttpStatus.FOUND, "Data Fetched Successfully", findAuthorByIdResponse['userProfileResponse'], res))
        } catch (error) {
            next(error)
        }
    }


}
