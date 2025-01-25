import { HttpContext } from '@/Shared/HttpContext';
import { ControllerContext } from '@/Application/ControllerContext';

export class ControllerContextProvider {
  create(httpContext: HttpContext): ControllerContext {
    return new ControllerContext(httpContext);
  }
}
