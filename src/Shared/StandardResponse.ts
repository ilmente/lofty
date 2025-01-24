export interface StandardSuccessResponse<D> {
  isSuccess: true;
  data: D;
  error: null;
}

export interface StandardErrorResponseException<E extends Error> {
  exception: E;
  message: string;
  status?: number;
  data?: any;
}

export interface StandardErrorResponse<E extends Error> {
  isSuccess: false;
  data: null;
  error: StandardErrorResponseException<E>;
}

export interface StandardVoidResponse<E extends Error = Error> {
  isSuccess: boolean;
  error: {
    exception: E;
    message: string;
    status?: number;
    data?: any;
  } | null;
}

export type StandardResponse<D = unknown, E extends Error = Error> = D extends void
  ? StandardVoidResponse<E>
  : StandardSuccessResponse<D> | StandardErrorResponse<E>;
