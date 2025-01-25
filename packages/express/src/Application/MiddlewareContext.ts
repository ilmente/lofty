import { NextFunction } from 'express';
import { HttpContext } from '@/Shared/HttpContext';
import { ApplicationContext } from '@/Application/ApplicationContext';

export class MiddlewareContext extends ApplicationContext {
  constructor(
    httpContext: HttpContext,
    readonly next: NextFunction,
  ) {
    super(httpContext);
  }
}
