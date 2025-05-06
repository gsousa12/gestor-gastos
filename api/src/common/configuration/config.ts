const ENV = process.env;

const config = {
  PORT: Number(ENV.PORT) ?? 3000,
  NODE_ENV: ENV.NODE_ENV ?? '',
  DATABASE: {
    DATABASE_HOST: ENV.DATABASE_HOST ?? '',
  },
  JWT: {
    JWT_SECRET: ENV.JWT_SECRET ?? '',
    JWT_EXPIRES_IN: ENV.JWT_EXPIRES_IN ?? '1h',
    JWT_MAX_AGE: 3600000, // 1 hora em ms
  },
  PAGINATION: {
    LIST_PAGE_LIMIT: 10,
  },
};

export { config };
