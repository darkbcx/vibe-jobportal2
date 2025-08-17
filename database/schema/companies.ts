import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const companies = sqliteTable('companies', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  description: text('description').notNull(),
  industry: text('industry').notNull(),
  size: text('size', { enum: ['startup', 'small', 'medium', 'large', 'enterprise'] }).notNull(),
  location: text('location').notNull(),
  website: text('website'),
  logoUrl: text('logo_url'),
  foundedYear: integer('founded_year'),
  employeeCount: integer('employee_count'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const companyReviews = sqliteTable('company_reviews', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  companyId: text('company_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  reviewerId: text('reviewer_id').notNull(),
  rating: integer('rating').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  pros: text('pros'), // JSON string
  cons: text('cons'), // JSON string
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}); 