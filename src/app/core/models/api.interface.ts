export interface ApiResponse<T> {
  data: T;
}

export interface ApiMessageOrError {
  error?: string;
  message?: string;
}
