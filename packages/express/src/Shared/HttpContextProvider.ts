import { Request, Response } from 'express';
import { HttpContext } from '@/Shared/HttpContext';

export class HttpContextProvider {
  create(request: Request, response: Response): HttpContext {
    return { request, response };
  }
}
