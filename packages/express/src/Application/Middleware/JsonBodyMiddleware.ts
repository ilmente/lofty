import bodyParser from 'body-parser';
import { Middleware } from '@/Application/Middleware';
import { MiddlewareContext } from '@/Application/MiddlewareContext';
import { ServiceContainer } from '@/Business/ServiceContainer';

export class JsonBodyMiddleware implements Middleware<ServiceContainer> {
  private readonly jsonBodyParser = bodyParser.json();

  async handler(context: MiddlewareContext): Promise<void> {
    this.jsonBodyParser(context.http.request, context.http.response, context.next);
  }
}
