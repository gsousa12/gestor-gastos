import { PaginationMeta } from '@common/structures/types';

type ApiResponse<T extends Record<string, any>> = {
  message: string;
  data: T;
  pagination?: PaginationMeta;
};

export function createApiResponse<T extends Record<string, any>>(
  message: string,
  data: T,
  pagination?: PaginationMeta,
): ApiResponse<T> {
  const response: any = { message };

  if (pagination) {
    response.pagination = pagination;
  }

  response.data = data;

  return response;
}
