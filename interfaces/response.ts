export interface IResponse<T = null> {
  success: boolean;
  data: T;
  message?: string | null;
  count?: number;
  read?: number;
  unread?: number;
}

export interface IResourseResponse {
  data: number;
  success: string;
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

export interface ISelect {
  text: string;
  value: string;
}
