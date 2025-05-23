export interface ApiResponse<T> {
  responseKey: string;
  responseMessage: string;
  data: T;
}
