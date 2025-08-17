import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const states = sqliteTable('states', {
  id: text('id').primaryKey(), // e.g., 'CA', 'NY', 'TX'
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const cities = sqliteTable('cities', {
  id: text('id').primaryKey(), // e.g., 'CA.SF', 'NY.NYC', 'TX.AUS'
  stateId: text('state_id').notNull().references(() => states.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  population: integer('population'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const districts = sqliteTable('districts', {
  id: text('id').primaryKey(), // e.g., 'CA.SF.SOMA', 'NY.NYC.MAN'
  cityId: text('city_id').notNull().references(() => cities.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  postalCode: text('postal_code'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}); 