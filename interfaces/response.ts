export interface IResponse<T = null> {
  success: boolean;
  data: T;
  message?: string | null;
}

export interface IList<T = null> {
  response: T[];
  pagination: IPagination;
}
export interface IPagination {
  currentPage: number;
  size: number;
  total: number;
}
