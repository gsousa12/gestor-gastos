import { Logger } from '@nestjs/common';

export async function connectionAttemp(connectFn: () => Promise<any>, retries = 20, delayMs = 20000) {
  let lastError: any;
  const logger = new Logger('Connection Attempt');
  for (let i = 0; i < retries; i++) {
    try {
      await connectFn();
      return;
    } catch (err) {
      lastError = err;
      logger.error(`Attempt ${i + 1} to connect to the database failed. Retrying in ${delayMs / 1000}s...`);
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  throw lastError;
}
