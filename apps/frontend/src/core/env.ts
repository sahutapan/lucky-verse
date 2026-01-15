import { z } from 'zod';

/**
 * Environment variables schema for validation.
 * Ensures consistent and type-safe access across the application.
 */
const envSchema = z.object({
    VITE_API_URL: z.string().url().default('http://localhost:8000/api/v1'),
    MODE: z.enum(['development', 'production', 'test']).default('development'),
    DEV: z.boolean().default(true),
    PROD: z.boolean().default(false),
});

/**
 * Validated environment variables.
 */
export const env = envSchema.parse({
    VITE_API_URL: import.meta.env.VITE_API_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
});
