const ENV = process.env;

const config = {
  PORT: Number(ENV.PORT) ?? 3000,
  NODE_ENV: ENV.NODE_ENV ?? '',
  DATABASE: {
    DATABASE_HOST: ENV.DATABASE_HOST ?? '',
  },
  JWT: {
    JWT_SECRET: ENV.DATABASE_HOST ?? '',
    JWT_EXPIRES_IN: ENV.JWT_EXPIRES_IN ?? '',
  },
};

export { config };
