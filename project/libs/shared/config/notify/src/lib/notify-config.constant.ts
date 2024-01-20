export const DEFAULT_NOTIFY_PORT = 3002;
export const DEFAULT_RABBIT_PORT = 5672;
export const DEFAULT_MONGO_PORT = 27017;
export const DEFAULT_SMTP_PORT = 25;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];

export const NOTIFY_ENV_FILE_PATH = 'apps/notify/.notify.env';

export const UPLOAD_DIRECTORY_PATH_LOCAL = 'project/uploads';
