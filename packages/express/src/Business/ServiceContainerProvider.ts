import { HttpContext } from '@/Shared/HttpContext';
import { ServiceContainer } from '@/Business/ServiceContainer';

export abstract class ServiceContainerProvider<C extends ServiceContainer> {
  abstract create(httpContext: HttpContext): C;
}
