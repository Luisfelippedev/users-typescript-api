export interface IHttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface IHttpRequest<T> {
  params?: any;
  headers?: any;
  body: T;
}
