# Database Setup

This project uses SQLite with Drizzle ORM for the database layer.

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   yarn install
   ```

2. **Generate migrations** (if schema changes):
   ```bash
   yarn db:generate
   ```

3. **Apply migrations**:
   ```bash
   yarn db:migrate
   ```

4. **Seed the database** with sample data:
   ```bash
   yarn db:seed
   ```

5. **View database** in Drizzle Studio:
   ```bash
   yarn db:studio
   ```

## Available Commands

- `yarn db:generate` - Generate new migrations from schema changes
- `yarn db:migrate` - Apply pending migrations to the database
- `yarn db:seed` - Populate database with sample data
- `yarn db:studio` - Open Drizzle Studio to view/edit database

## Database Structure

The database includes the following main tables:

- **users** - User accounts (job seekers, companies, admins)
- **jobs** - Job postings
- **applications** - Job applications
- **companies** - Company information
- **locations** - Geographic locations
- **industries** - Industry categories

## Schema Files

- `schema/users.ts` - User and profile schemas
- `schema/jobs.ts` - Job posting schemas
- `schema/applications.ts` - Application schemas
- `schema/companies.ts` - Company schemas
- `schema/locations.ts` - Location schemas
- `schema/industries.ts` - Industry schemas

## Usage in Code

```typescript
import { db } from '@/lib/db';
import { users } from '@/lib/db-types';

// Query users
const allUsers = await db.select().from(users).all();

// Get user by ID
const user = await db.select().from(users).where(eq(users.id, userId)).get();
```

## Database File Location

The SQLite database file is located at: `database/data.db`

## Migration History

- `0000_majestic_captain_america.sql` - Initial schema creation
