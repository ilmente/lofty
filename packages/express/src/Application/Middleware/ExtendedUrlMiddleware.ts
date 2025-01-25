import bodyParser from 'body-parser';
import { ServiceContainer } from '@/Business/ServiceContainer';
import { Middleware } from '@/Application/Middleware';
import { MiddlewareContext } from '@/Application/MiddlewareContext';

export class ExtendedUrlMiddleware implements Middleware<ServiceContainer> {
  private readonly urlEncodedBodyParser = bodyParser.urlencoded({ extended: true });

  async handler(context: MiddlewareContext): Promise<void> {
    this.urlEncodedBodyParser(context.http.request, context.http.response, context.next);
  }
}
