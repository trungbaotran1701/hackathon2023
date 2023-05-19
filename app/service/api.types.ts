export interface ResponseProps<T> {
  success: Boolean;
  message: string;
  result: T;
}
