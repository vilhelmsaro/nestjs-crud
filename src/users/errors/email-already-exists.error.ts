import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsError extends HttpException {
  constructor() {
    super('The email provided is already in use.', HttpStatus.CONFLICT);
  }
}
