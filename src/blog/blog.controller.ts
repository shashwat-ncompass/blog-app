import { Body, Controller, HttpStatus, Post, Get, Param, Req, Res, UseGuards, Delete, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
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
  constructor(private readonly blogService: BlogService) {}

  @HasRoles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  async createBlog(
    @Body() createBlogDto: createBlog,
    @Req() req: Request,
  ) {
    try 
    {
      const userId = req.user['userId'];
      const topicId = req.body.topicId;
      const response = await this.blogService.createBlog(userId, topicId, createBlogDto);

      return response;
    } catch (error) {
      throw error;
    }
  }

  @HasRoles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':id/update')
  async editBlog(
    @Param('blogId') blogId: string,
    @Body('fieldToUpdate') fieldToUpdate: keyof editBlog,
    @Body('updatedValue') updatedValue: string,
    @Req() req: Request
  ) {

    const userId = req.user['userId'];

    try {

      if (!['name', 'desc', 'header', 'footer', 'body'].includes(fieldToUpdate)) {
        throw new customError(HttpStatus.NOT_FOUND, "Invalid Field", "Kindly re-check the field");
      }

      const editResult = await this.blogService.editBlog(userId, blogId, fieldToUpdate, updatedValue);
      return editResult;

    } catch (error) {
      if (error instanceof customError) {
        throw error;
      } else {
        throw new customError(
          error.status || 500,
          error.title || 'Edit Blog Error',
          error.detail || 'An unexpected error occurred while editing the blog.'
        );
      }
    }
  }

  @HasRoles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':id/delete')
  async deleteBlog(
    @Param('blogId') blogId: string,
    @Req() req: any
  ) {
    const userId = req.user.id;

    try {
      const result = await this.blogService.deleteBlog(userId, blogId);
      return { message: 'Blog archived successfully', result };
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      } else {
        throw new customError(
          error.status || 500,
          error.title || 'Delete Blog Error',
          error.detail || 'An unexpected error occurred while deleting the blog.'
        );
      }
    }
  }

  @Get('topic/:topicId')
  async getBlogsByTopic(@Param('topicId') topicId: string, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const blogs = await this.blogService.findAllBlogsForTopic(topicId);
      if(blogs instanceof customError){
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
