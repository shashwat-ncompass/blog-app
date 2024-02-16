import { Res } from '@nestjs/common';
import { Response } from 'express';

export class ApiResponse {
  constructor(
    private status: number,
    private message: string,
    private data: any,
    @Res() res: Response,
  ) {
    res.status(this.status).send({
      status: this.status,
      data: {
        message: this.message,
        data: this.data,
      },
    });
  }
}
