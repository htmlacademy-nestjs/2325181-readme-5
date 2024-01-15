export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_NOTIFY_PORT = 3002;
export const DEFAULT_RABBIT_PORT = 5672;
export const DEFAULT_MONGO_PORT = 27017;

export const NotifyValidationMessage = {
  EnvironmentRequired: 'Notify environment is required',
  EnvironmentValues: 'Notify environment should be string value one of the following values: development, production, stage',
  DirectoryRequired: 'Notify directory is required',
  DirectoryValue: 'Notify directory should be a string value',
  PortNumber: 'Notify port should be a number between 0 and 655535.',
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
  RabbitHostRequired: 'Rabbit host is required',
  RabbitHostInvalidFormat: 'Rabbit host should be a string value.',
  RabbitPasswordRequired: 'Rabbit password is required',
  RabbitPasswordInvalidFormat: 'Rabbit password should be a string value.',
  RabbitPortNumber: 'Notify port should be a number between 0 and 655535.',
  RabbitUserRequired: 'Rabbit user is required',
  RabbitUserInvalidFormat: 'Rabbit user should be a string value.',
  RabbitQueueRequired: 'Rabbit queue is required',
  RabbitQueueInvalidFormat: 'Rabbit queue should be a string value.',
  RabbitExchangeRequired: 'Rabbit exchange is required',
  RabbitExchangeInvalidFormat: 'Rabbit exchange should be a string value.',
} as const;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];

export const ENV_FILE_PATH = 'apps/notify/notify.env';
