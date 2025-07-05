import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // Core app info
  appName: process.env.APP_NAME,
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  // MongoDB connection
  databaseURL: process.env.MONGODB_URI || '',

  // Logging
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  // JWT - for access & refresh token (asymmetric keys)
  jwt: {
    algorithm: process.env.JWT_ALGORITHM || 'RS256',
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '3d',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // Symmetric encryption for privateKey stored in DB
  encryption: {
    algorithm: process.env.ALGORITHM || 'aes-256-cbc',
    ivLength: parseInt(process.env.IV_LENGTH || '16'),
    secretKey: process.env.SECRET_KEY || '',
  },

  // Agenda job settings
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: process.env.AGENDA_CONCURRENCY,
  },

  // Agendash dashboard
  agendash: {
    user: 'agendash',
    password: '123456',
  },

  // API settings
  api: {
    prefix: '/api',
  },

  // Mailgun email service
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN,
  },

  // Discord webhook (optional for alerts/logs)
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  },
};
