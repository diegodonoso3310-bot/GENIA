import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_ISSUER: z.string().min(1).default('genia'),
  ACCESS_TOKEN_TTL: z.string().min(2).default('15m'),
});

export const env = envSchema.parse(process.env);
