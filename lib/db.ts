import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { resolve } from 'path';

// Create the database connection
const sqlite = new Database(resolve(process.cwd(), 'database/data.db'));
export const db = drizzle(sqlite);

// Export the raw database instance for migrations and seeding
export { sqlite };
