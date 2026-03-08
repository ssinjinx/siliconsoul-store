import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// This will be used at runtime - build time will work with an empty string
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';

export const db = drizzle(postgres(connectionString), { schema });
