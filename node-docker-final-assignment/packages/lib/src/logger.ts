import * as winston from 'winston';
import { format } from 'logform/dist/browser';
import { config } from './config';

export default class Logger {
  logger: winston.Logger;
  level: string;
  prefix: string;

  constructor(module: string, jsFile: string) {
    this.level = config.env === 'production' ? 'error' : 'silly';
    this.prefix = `${module}[${jsFile}]`;
    this.logger = winston.createLogger({
      level: this.level,
      transports: [
        new winston.transports.Console({
          format: format.combine(format.simple()),
        }),
        // new winston.transports.File({ filename: logFile }),
      ],
    });
    // confusion
    // this.setLogger(logFile);
  }
  setLogger(): void {
    this.logger = winston.createLogger({
      level: this.level,
      transports: [
        new winston.transports.Console({
          format: format.combine(format.simple()),
        }),
        // new winston.transports.File({ filename: logFile }),
      ],
    });
  }
  setLevel(level: string): void {
    this.level = level;
  }

  silly(arg: string): void {
    this.logger.silly(`${this.prefix}: ${arg}`);
  }
  debug(arg: string): void {
    this.logger.debug(`${this.prefix}: ${arg}`);
  }
  info(arg: string): void {
    this.logger.info(`${this.prefix}: ${arg}`);
  }
  error(arg: string | unknown): void {
    this.logger.error(`${this.prefix}: ${arg}`);
  }
}
