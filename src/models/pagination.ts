export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

export interface Pageable {
  size: number;
  page: number;
}
