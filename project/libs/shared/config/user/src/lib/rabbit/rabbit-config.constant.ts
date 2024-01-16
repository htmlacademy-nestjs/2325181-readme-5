export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_RABBIT_PORT = 5672;

export const RabbitValidationMessage = {
  RabbitHostRequired: 'Rabbit host is required',
  RabbitHostInvalidFormat: 'Rabbit host should be a string value.',
  RabbitPasswordRequired: 'Rabbit password is required',
  RabbitPasswordInvalidFormat: 'Rabbit password should be a string value.',
  RabbitPortNumber: 'Rabbit port should be a number between 0 and 655535.',
  RabbitUserRequired: 'Rabbit user is required',
  RabbitUserInvalidFormat: 'Rabbit user should be a string value.',
  RabbitQueueRequired: 'Rabbit queue is required',
  RabbitQueueInvalidFormat: 'Rabbit queue should be a string value.',
  RabbitExchangeRequired: 'Rabbit exchange is required',
  RabbitExchangeInvalidFormat: 'Rabbit exchange should be a string value.',
} as const;
