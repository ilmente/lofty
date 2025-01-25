import { HttpContextProvider } from '@/Shared/HttpContextProvider';
import { ServiceContainer } from '@/Business/ServiceContainer';
import { ServiceContainerProvider } from '@/Business/ServiceContainerProvider';
import { MiddlewareContextProvider } from '@/Application/MiddlewareContextProvider';
import { ControllerContextProvider } from '@/Application/ControllerContextProvider';
import { Application } from '@/Application/Application';
import { JsonBodyMiddleware } from '@/Application/Middleware/JsonBodyMiddleware';
import { ExtendedUrlMiddleware } from '@/Application/Middleware/ExtendedUrlMiddleware';

export class ApplicationProvider {
  static create<C extends ServiceContainer>(serviceContainerProvider: ServiceContainerProvider<C>): Application<C> {
    const application = new Application(
      new HttpContextProvider(),
      new MiddlewareContextProvider(),
      new ControllerContextProvider(),
      serviceContainerProvider,
    );

    application.addMiddleware(new ExtendedUrlMiddleware());
    application.addMiddleware(new JsonBodyMiddleware());

    return application;
  }
}
