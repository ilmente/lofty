import { Express } from 'express';
import { ServiceContainer } from '@/Business/ServiceContainer';
import { ControllerContext } from '@/Application/ControllerContext';

export type Method = keyof Pick<Express, 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'>;

export abstract class Controller<C extends ServiceContainer> {
  abstract readonly route: string;
  abstract readonly method: Method;

  abstract handler(context: ControllerContext, container: C): void | Promise<void>;
}
