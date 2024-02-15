import { Controller, Get, HttpStatus, Next, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/utils/apiResponse';
import { customError } from 'src/utils/exceptionHandler';
import { NextFunction, Request, Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getProfile(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        try {
            console.log(req['user'])
            const userId = req['user']['userId']
            console.log(userId, id, userId != id)
            if (userId != id) {
                throw (new customError(HttpStatus.FORBIDDEN, "Some Error Occured", "Access Denied"))
            }
            const findAuthorByIdResponse = await this.userService.findUserById(id);
            return (new ApiResponse(HttpStatus.FOUND, "Data Fetched Successfully", findAuthorByIdResponse, res))
        } catch (error) {
            next(error)
        }
    }
}
