import { HttpException, HttpStatus } from '@nestjs/common';

interface Error {
  //   message?: never;
  error?: never;
  [k: string]: string;
}

export class NotFoundTaskException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: 'Task not found',
        error: 'Not Found',
        ...error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
