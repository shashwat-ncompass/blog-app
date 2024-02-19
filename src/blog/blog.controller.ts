import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Param,
  Req,
  UseGuards,
  Delete,
  Res,
  Next,
  Get
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';


import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { BlogService } from './blog.service';
import { createBlog } from './dtos/createBlog.dto';
import { customError } from 'src/utils/exceptionHandler';
import { editBlog } from './dtos/editBlog.dto';
import { ApiResponse } from 'src/utils/apiResponse';
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @HasRoles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  async createBlog(
    @Res() res: Response,
    @Body() createBlogDto: createBlog,
    @Req() req: Request,
    @Next() next: NextFunction
  ) {
    try {
      const userId = req.user['userId'];
      const topicId = req.body.topicId;
      const blogId = uuid();
      createBlogDto.id = blogId

      const createBlogResponse = await this.blogService.createBlog(userId, topicId, createBlogDto);
      if (createBlogResponse instanceof customError) {
        throw createBlogResponse
      }
      return new ApiResponse(
        HttpStatus.FOUND,
        'Blog Created Successfully',
        createBlogResponse,
        res,
      );
    } catch (error) {
      next(error)
    }
  }

  @HasRoles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':id/update')
  async editBlog(
    @Param('id') blogId: string,
    @Body('fieldToUpdate') fieldToUpdate: keyof editBlog,
    @Body('updatedValue') updatedValue: string,
    @Req() req: Request,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user['userId'];
      if (!['name', 'desc', 'header', 'footer', 'body'].includes(fieldToUpdate)) {
        throw new customError(HttpStatus.NOT_FOUND, "Invalid Field", "Kindly re-check the field");
      }
      const editResult = await this.blogService.editBlog(userId, blogId, fieldToUpdate, updatedValue);
      if (editResult instanceof customError) {
        throw editResult;
      }
      return new ApiResponse(
        HttpStatus.FOUND,
        'Blog Updated Successfully',
        editResult,
        res,
      );

    } catch (error) {
      next(error)
    }
  }

  @HasRoles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':id/delete')
  async deleteBlog(
    @Param('blogId') blogId: string,
    @Req() req: Request,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user['userId'];
      const deleteBlogResponse = await this.blogService.deleteBlog(userId, blogId);
      if (deleteBlogResponse instanceof customError) {
        throw deleteBlogResponse;
      }
      return new ApiResponse(
        HttpStatus.FOUND,
        'Blog archived successfully',
        deleteBlogResponse,
        res,
      );
    } catch (error) {
      next(error)
    }
  }

  @Get('topic/:topicId')
  async getBlogsByTopic(@Param('topicId') topicId: string, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const blogs = await this.blogService.findAllBlogsForTopic(topicId);
      if (blogs instanceof customError) {
        throw blogs;
      }
      return new ApiResponse(
        HttpStatus.FOUND,
        "Blogs loaded",
        blogs,
        res,
      )
    } catch (error) {
      next(error);
    }
  }
}
