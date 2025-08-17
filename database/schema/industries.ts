import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { jobs } from './jobs';

export const industries = sqliteTable('industries', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const jobSeekerSavedJobs = sqliteTable('job_seeker_saved_jobs', {
  jobSeekerId: text('job_seeker_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  jobPostingId: text('job_posting_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const searchHistory = sqliteTable('search_history', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  query: text('query').notNull(),
  filters: text('filters'), // JSON string
  resultsCount: integer('results_count').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const savedSearches = sqliteTable('saved_searches', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  query: text('query').notNull(),
  filters: text('filters'), // JSON string
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}); 