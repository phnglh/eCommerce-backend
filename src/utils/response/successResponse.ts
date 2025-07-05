/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { HTTP_STATUS_CODE } from '../../contants/httpStatusCode';

interface ResponseOptions {
  message: string;
  data?: any;
  options?: Record<string, any>;
  status?: number;
}

class SuccessResponse {
  message: string;
  status: number;
  data: any;
  options: Record<string, any>;

  constructor({
    message,
    status = HTTP_STATUS_CODE.OK,
    data = {},
    options = {},
  }: ResponseOptions) {
    this.message = message;
    this.status = status;
    this.data = data;
    this.options = options;
  }

  send(res: Response) {
    return res.status(this.status).json({
      message: this.message,
      status: this.status,
      data: this.data,
      ...this.options,
    });
  }
}

class Ok extends SuccessResponse {
  constructor({ message, data = {}, options = {} }: ResponseOptions) {
    super({ message, data, options });
  }
}

class Created extends SuccessResponse {
  constructor({ message, data = {}, options = {} }: ResponseOptions) {
    super({ message, status: HTTP_STATUS_CODE.CREATED, data, options });
  }
}

export const OK = (
  res: Response,
  message: string,
  data?: any,
  options?: Record<string, any>,
) => new Ok({ message, data, options }).send(res);

export const CREATED = (
  res: Response,
  message: string,
  data?: any,
  options?: Record<string, any>,
) => new Created({ message, data, options }).send(res);
