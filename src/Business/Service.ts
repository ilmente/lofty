import { Logger } from '@/Shared/Logger';
import { StandardSuccessResponse, StandardErrorResponse } from '@/Shared/StandardResponse';

export abstract class Service {
  protected success<D = unknown>(data: D, message: string = ''): StandardSuccessResponse<D> {
    Logger.shared.debug(Logger.getParentMethodName(), message);
    return { isSuccess: true, data, error: null };
  }

  protected error<E extends Error>(error: E | { exception: E }, message: string): StandardErrorResponse<E> {
    const exception = Logger.extractException(error);
    Logger.shared.error(Logger.getParentMethodName(), message, exception);
    return { isSuccess: false, data: null, error: { exception, message } };
  }
}
