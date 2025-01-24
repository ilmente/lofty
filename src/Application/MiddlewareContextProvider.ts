import { NextFunction } from 'express';
import { HttpContext } from '@/Shared/HttpContext';
import { MiddlewareContext } from '@/Application/MiddlewareContext';

export class MiddlewareContextProvider {
  create(httpContext: HttpContext, next: NextFunction): MiddlewareContext {
    return new MiddlewareContext(httpContext, next);
  }
}
