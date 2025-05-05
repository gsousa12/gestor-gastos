import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || '',
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
  },
}));
