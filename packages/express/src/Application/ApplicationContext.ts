import { Logger } from '@/Shared/Logger';
import { HttpContext } from '@/Shared/HttpContext';
import { StandardResponse } from '@/Shared/StandardResponse';

interface RenderOptions {
  html: string | (() => void);
  status?: number;
  message?: string;
  error?: any;
}

interface SendOptions<D, E> {
  data?: D | null;
  error?: E | null;
  status?: number;
  message?: string;
}

interface RedirectOptions {
  url: string;
  status?: number;
  message?: string;
}

export abstract class ApplicationContext {
  constructor(readonly http: HttpContext) {}

  protected logResponse(...args: any[]): void {
    const messageArgs = [
      this.http.request.method,
      this.http.request.url,
      this.http.response.statusCode,
      ...args.filter(Boolean).flatMap((arg) => ['\n', arg]),
    ];

    this.isSuccess && Logger.shared.success.raw(...messageArgs);
    this.isRedirect && Logger.shared.success.raw(...messageArgs);
    this.isAuthError && Logger.shared.warn.raw(...messageArgs);
    this.isServerError && Logger.shared.error.raw(...messageArgs);
  }

  protected extractException<E = any>(error: E | { exception: E }): E {
    return !!error && typeof error === 'object' && 'exception' in error ? error.exception : error;
  }

  get isSuccess(): boolean {
    return this.http.response.statusCode >= 200 && this.http.response.statusCode < 300;
  }

  get isRedirect(): boolean {
    return this.http.response.statusCode >= 300 && this.http.response.statusCode < 400;
  }

  get isAuthError(): boolean {
    return this.http.response.statusCode >= 400 && this.http.response.statusCode < 500;
  }

  get isServerError(): boolean {
    return this.http.response.statusCode >= 500;
  }

  render({ html, status = 200, message = '', error = null }: RenderOptions): void {
    Logger.shared.debug(Logger.getParentMethodName(), '-> Context.render()');
    this.http.response.statusCode = status;
    this.logResponse(message, error);
    typeof html === 'function' ? html() : this.http.response.render(html);
  }

  send<D, E extends Error>({ data = null, error = null, status = 200, message = '' }: SendOptions<D, E>): void {
    Logger.shared.debug(Logger.getParentMethodName(), '-> Context.send()');
    const exception = this.extractException(error);
    this.http.response.statusCode = status;
    this.logResponse(message, exception);
    this.http.response.json({
      isSuccess: this.isSuccess,
      data: this.isSuccess ? data : null,
      error: this.isSuccess ? null : { exception, message, status, data },
    } as StandardResponse<D, E>);
  }

  redirect({ url, status = 302, message = '' }: RedirectOptions): void {
    Logger.shared.debug(Logger.getParentMethodName(), '-> Context.redirect()');
    this.http.response.statusCode = status;
    this.logResponse(message, 'redirect to', url);
    this.http.response.redirect(url);
  }
}
