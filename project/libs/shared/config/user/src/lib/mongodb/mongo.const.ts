export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_MONGO_PORT = 27017;

export const MongoValidationMessage = {
  DBHostRequired: 'MongoDB host is required',
  DBNameRequired: 'MongoDB name is required',
  DBPortRequired: 'MongoDB port is required',
  DBUserRequired: 'MongoDB user is required',
  DBPasswordRequired: 'MongoDB password is required',
  DBBaseAuthRequired: 'MongoDB authentication base is required',
} as const;
