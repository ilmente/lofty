import { createConsola, ConsolaInstance, LogLevels } from 'consola';
import { Config } from '@/Shared/Config';

type LoggerInstance = ConsolaInstance;

export class Logger {
  static readonly shared: LoggerInstance = Logger.create();

  private constructor() {}

  static create(): LoggerInstance {
    return createConsola({
      level: Config.logLevel,
      formatOptions: {
        columns: 120,
        colors: true,
        compact: false,
        date: false,
      },
    });
  }

  static getParentMethodName(instance: LoggerInstance = Logger.shared): string {
    if (instance.level !== LogLevels.debug) {
      return '';
    }

    const methodName = new Error().stack?.split('\n')[3]?.trim()?.split(' ')[1] || 'unknown';
    return `${methodName}()`;
  }

  static extractException<E = any>(error: E | { exception: E }): E {
    return !!error && typeof error === 'object' && 'exception' in error ? error.exception : error;
  }
}
