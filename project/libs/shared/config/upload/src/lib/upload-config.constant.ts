export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_UPLOAD_PORT = 3000;

export const DEFAULT_MONGO_PORT = 27017;

export const UploadValidationMessage = {
  EnvironmentRequired: 'Upload environment is required',
  EnvironmentValues: 'Upload environment should be string value one of the following values: development, production, stage',
  DirectoryRequired: 'Upload directory is required',
  DirectoryValue: 'Upload directory should be a string value',
  PortNumber: 'Upload port should be a number between 0 and 655535.',
  DBHostRequired: 'DB host is required',
  DBHostInvalidFormat: 'DB host should be a string value.',
  DBNameRequired: 'DB name is required',
  DBNameInvalidFormat: 'DB name should be a string value.',
  DBPortInvalidFormat: 'DB port should be a number value between 0 and 655535.',
  DBUserRequired: 'DB user is required',
  DBUserInvalidFormat: 'DB user should be a string value.',
  DBPasswordRequired: 'DB password is required',
  DBPasswordInvalidFormat: 'DB password should be a string value.',
  DBBaseAuthRequired: 'DB authentication base is required',
  DBBaseAuthInvalidFormat: 'DB authentication base should be a string value.',

} as const;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];

export const ENV_FILE_PATH = 'apps/upload/upload.env';
