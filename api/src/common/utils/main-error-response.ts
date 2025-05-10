import { HttpException } from '@nestjs/common';

export function mainErrorResponse(error: unknown) {
  if (error instanceof HttpException) {
    const response = error.getResponse() as any;

    return {
      message: response.message || 'Unexpected error',
      error: response.error || error.name,
      statusCode: error.getStatus(),
      data: {},
    };
  }

  return {
    message: 'Internal server error',
    error: 'InternalServerError',
    statusCode: 500,
    data: {},
  };
}
