import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: text('role', { enum: ['jobseeker', 'company', 'admin'] }).notNull().default('jobseeker'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const jobSeekerProfiles = sqliteTable('job_seeker_profiles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio'),
  skills: text('skills'), // JSON string
  experience: text('experience').notNull(),
  education: text('education').notNull(),
  location: text('location').notNull(),
  resumeUrl: text('resume_url'),
  avatarUrl: text('avatar_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const companyProfiles = sqliteTable('company_profiles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  companyName: text('company_name').notNull(),
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