// prisma-exception.filter.ts
import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof BadRequestException) {
      console.log('badrequest')
    }
    const status = exception instanceof UnauthorizedException ?
      HttpStatus.UNAUTHORIZED : exception instanceof BadRequestException ?
       HttpStatus.BAD_REQUEST : exception instanceof ConflictException ? HttpStatus.CONFLICT : 500

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
