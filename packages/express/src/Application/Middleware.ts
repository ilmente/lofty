import { ServiceContainer } from '@/Business/ServiceContainer';
import { MiddlewareContext } from '@/Application/MiddlewareContext';

export interface Middleware<C extends ServiceContainer> {
  handler(context: MiddlewareContext, container: C): void | Promise<void>;
}

export interface ErrorMiddleware {
  errorHandler(context: MiddlewareContext, error: any): void | Promise<void>;
}
