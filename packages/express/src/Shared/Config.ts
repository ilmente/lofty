import { LogLevel, LogLevels } from 'consola';

interface Settings {
  logLevel: LogLevel;
  port: number;
  redirectUrlOnNotFound: string;
  redirectUrlOnServerError: string;
}

const DEFAULT_SETTINGS: Settings = {
  logLevel: LogLevels.info,
  port: 4321,
  redirectUrlOnNotFound: '/404',
  redirectUrlOnServerError: '/500',
};

export class Config {
  private static settings: Settings = DEFAULT_SETTINGS;

  static set(settings: Partial<Settings>): void {
    this.settings = { ...this.settings, ...settings };
  }

  static get logLevel(): LogLevel {
    return this.settings.logLevel;
  }

  static get port(): number {
    return this.settings.port;
  }

  static get redirectUrlOnServerError(): string {
    return this.settings.redirectUrlOnServerError;
  }

  static get redirectUrlOnNotFound(): string {
    return this.settings.redirectUrlOnNotFound;
  }
}
