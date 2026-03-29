import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startedAt = Date.now();
    const method = req.method;
    const url = req.originalUrl ?? req.url;

    this.logger.log(`${colorize('cyan', '→')} ${formatMethod(method)} ${colorize('dim', url)}`);

    res.on('finish', () => {
      const duration = Date.now() - startedAt;
      const length = res.getHeader('content-length');
      const suffix = typeof length === 'undefined' ? '' : ` ${colorize('dim', `${length}b`)}`;
      const status = colorize(statusColor(res.statusCode), String(res.statusCode));
      const timing = colorize(durationColor(duration), `${duration}ms`);

      this.logger.log(`${colorize('green', '←')} ${formatMethod(method)} ${colorize('dim', url)} ${status} ${timing}${suffix}`);
    });

    next();
  }
}

function formatMethod(method: string) {
  return colorize(methodColor(method), method.padEnd(7));
}

function methodColor(method: string) {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'green';
    case 'POST':
      return 'cyan';
    case 'PATCH':
      return 'yellow';
    case 'PUT':
      return 'blue';
    case 'DELETE':
      return 'red';
    default:
      return 'magenta';
  }
}

function statusColor(statusCode: number) {
  if (statusCode >= 500) return 'red';
  if (statusCode >= 400) return 'yellow';
  if (statusCode >= 300) return 'cyan';
  return 'green';
}

function durationColor(durationMs: number) {
  if (durationMs >= 1000) return 'red';
  if (durationMs >= 300) return 'yellow';
  return 'green';
}

function colorize(color: ColorName, value: string) {
  return `${ANSI[color]}${value}${ANSI.reset}`;
}

type ColorName = keyof typeof ANSI;

const ANSI = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
} as const;
