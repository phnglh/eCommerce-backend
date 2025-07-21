/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { HTTP_STATUS_CODE } from '../../contants/httpStatusCode';
import { HTTP_STATUS_MESSAGE } from '../../contants/httpStatusMessage';

interface ErrorResponseOptions {
  message: string;
  status?: number;
  errors?: any;
  stack?: string;
  options?: Record<string, any>;
}

class ErrorResponse {
  message: string;
  status: number;
  errors?: any;
  stack?: string;
  options?: Record<string, any>;

  constructor({
    message,
    status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    errors,
    stack,
    options = {},
  }: ErrorResponseOptions) {
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.stack = stack;
    this.options = options;
  }

  send(res: Response, headers: Record<string, any> = {}) {
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, String(value));
    });

    const responseBody: Record<string, any> = {
      message: this.message,
      status: this.status,
      ...(this.errors && { errors: this.errors }),
      ...(this.stack &&
        process.env.NODE_ENV === 'development' && { stack: this.stack }),
      ...(this.options &&
        Object.keys(this.options).length > 0 && { options: this.options }),
    };

    return res.status(this.status).json(responseBody);
  }
}

export const ERROR = (
  res: Response,
  message: string,
  status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  errors?: any,
  options: Record<string, any> = {},
) => {
  new ErrorResponse({ message, status, errors, options }).send(res);
};

export const CONFLICTERROR = (
  res: Response,
  message = HTTP_STATUS_MESSAGE.CONFLICT,
  status = HTTP_STATUS_CODE.CONFLICT,
  errors?: any,
  options: Record<string, any> = {},
) => {
  new ErrorResponse({
    message,
    status,
    errors,
    options,
  }).send(res);
};

export const BadRequestError = (
  message = HTTP_STATUS_MESSAGE.BAD_REQUEST,
  status = HTTP_STATUS_CODE.BAD_REQUEST,
  errors?: any,
  options: Record<string, any> = {},
) => {
  new ErrorResponse({ message, status, errors, options });
};

export const AuthFailureError = (
  message = HTTP_STATUS_MESSAGE.UNAUTHORIZED,
  status = HTTP_STATUS_CODE.UNAUTHORIZED,
  errors?: any,
  options: Record<string, any> = {},
) => {
  new ErrorResponse({ message, status, errors, options });
};

export const NotFoundError = (
  message = HTTP_STATUS_MESSAGE.NOT_FOUND,
  status = HTTP_STATUS_CODE.NOT_FOUND,
  errors?: any,
  options: Record<string, any> = {},
) => {
  new ErrorResponse({ message, status, errors, options });
};
export const ForbiddenError = (
  message = HTTP_STATUS_MESSAGE.FORBIDDEN,
  status = HTTP_STATUS_CODE.FORBIDDEN,
  errors?: any,
  options: Record<string, any> = {},
) => {
  new ErrorResponse({ message, status, errors, options });
};

export default ErrorResponse;
