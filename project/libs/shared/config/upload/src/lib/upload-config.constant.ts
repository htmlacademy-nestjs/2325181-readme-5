export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_UPLOAD_PORT = 3000;

export const UploadValidationMessage = {
  EnvironmentRequired: 'Upload environment is required',
  EnvironmentValues: 'Upload environment should be string value one of the following values: development, production, stage',
  DirectoryRequired: 'Upload directory is required',
  DirectoryValue: 'Upload directory should be a string value',
  PortNumber: 'Upload port should be a number between 0 and 655535.',
} as const;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];

export const ENV_FILE_PATH = 'apps/upload/upload.env';
