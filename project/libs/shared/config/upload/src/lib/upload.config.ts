import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { ENVIRONMENTS, Environment, UPLOAD_DIRECTORY_PATH_LOCAL, DEFAULT_UPLOAD_PORT, DEFAULT_MONGO_PORT } from './upload-config.constant';

export interface UploadConfig {
  serveRoot: string;
  environment: string;
  uploadDirectory: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

const validationSchema = Joi.object({
  serveRoot: Joi.string().required(),
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  uploadDirectory: Joi.string().required(),
  port: Joi.number().port(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  })
});

function validateConfig(config: UploadConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Upload Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): UploadConfig {
  const config: UploadConfig = {
    serveRoot: process.env.SERVE_ROOT,
    environment: process.env.NODE_ENV as Environment,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH ?? UPLOAD_DIRECTORY_PATH_LOCAL,
    port: parseInt(process.env.PORT || `${DEFAULT_UPLOAD_PORT}`, 10),
    db: {
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };
  validateConfig(config);
  return config;
};

export default registerAs('application', getConfig);
