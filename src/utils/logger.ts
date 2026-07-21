type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isDevelopment = process.env.NODE_ENV === 'development';

const formatLog = (level: LogLevel, message: string, data?: unknown): string => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  return `${prefix} ${message}`;
};

export const logger = {
  info: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.log(formatLog('info', message), data);
    }
    // TODO: Send to monitoring service in production
  },

  warn: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.warn(formatLog('warn', message), data);
    }
  },

  error: (message: string, error?: unknown) => {
    console.warn(formatLog('error', message), error);
    // TODO: Send to monitoring service (Sentry, LogRocket, etc)
  },

  debug: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.debug(formatLog('debug', message), data);
    }
  },
};
