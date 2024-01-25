export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_UPLOAD_PORT = 8000;

export const DEFAULT_MONGO_PORT = 27018;
export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];

export const ENV_FILE_PATH = 'apps/upload/.upload.env';

export const UPLOAD_DIRECTORY_PATH_LOCAL = 'project/uploads';
