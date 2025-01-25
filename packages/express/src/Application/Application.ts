import express, { NextFunction, Request, Response, Express } from 'express';
import { Config } from '@/Shared/Config';
import { Logger } from '@/Shared/Logger';
import { HttpContextProvider } from '@/Shared/HttpContextProvider';
import { ServiceContainer } from '@/Business/ServiceContainer';
import { ServiceContainerProvider } from '@/Business/ServiceContainerProvider';
import { MiddlewareContextProvider } from '@/Application/MiddlewareContextProvider';
import { ControllerContextProvider } from '@/Application/ControllerContextProvider';
import type { ErrorMiddleware, Middleware } from '@/Application/Middleware';
import type { Controller } from '@/Application/Controller';

export class Application<C extends ServiceContainer> {
  protected readonly router: Express = express();

  constructor(
    protected readonly httpContextProvider: HttpContextProvider,
    protected readonly middlewareContextProvider: MiddlewareContextProvider,
    protected readonly controllerContextProvider: ControllerContextProvider,
    protected readonly serviceContainerProvider: ServiceContainerProvider<C>,
  ) {}

  addStaticPath(virtualPath: string, dir: string): void {
    this.router.use(virtualPath, express.static(dir));
  }

  addMiddleware(middleware: Middleware<C>, route?: string | RegExp): void {
    const handler = async (request: Request, response: Response, next: NextFunction) => {
      const httpContext = this.httpContextProvider.create(request, response);
      const middlewareContext = this.middlewareContextProvider.create(httpContext, next);
      const serviceContainer = this.serviceContainerProvider.create(httpContext);
      return middleware.handler(middlewareContext, serviceContainer);
    };

    route ? this.router.use(route, handler) : this.router.use(handler);
  }

  addErrorMiddleware(middleware: ErrorMiddleware): void {
    this.router.use(async (error: unknown, request: Request, response: Response, next: NextFunction) => {
      const httpContext = this.httpContextProvider.create(request, response);
      const middlewareContext = this.middlewareContextProvider.create(httpContext, next);
      return middleware.errorHandler(middlewareContext, error);
    });
  }

  addController(controller: Controller<C>): void {
    this.router[controller.method](controller.route, async (request: Request, response: Response) => {
      const httpContext = this.httpContextProvider.create(request, response);
      const controllerContext = this.controllerContextProvider.create(httpContext);
      const serviceContainer = this.serviceContainerProvider.create(httpContext);
      return controller.handler(controllerContext, serviceContainer);
    });
  }

  start(): void {
    this.router.listen(Config.port, () => Logger.shared.start(`lofty app running on port ${Config.port}...`));
  }
}
