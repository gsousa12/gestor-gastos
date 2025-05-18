export type PaginationMeta = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

export interface ApiResponse<T> {
  message: string;
  data: T;
  pagination?: PaginationMeta;
}
