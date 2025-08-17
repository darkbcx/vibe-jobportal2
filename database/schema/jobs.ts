import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { industries } from './industries';
import { states, cities, districts } from './locations';

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  companyId: text('company_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  requirements: text('requirements'), // Rich text/HTML
  responsibilities: text('responsibilities'), // Rich text/HTML
  salaryMin: real('salary_min'),
  salaryMax: real('salary_max'),
  salaryCurrency: text('salary_currency').notNull().default('USD'),
  locationType: text('location_type', { enum: ['remote', 'hybrid', 'onsite', 'flexible'] }).notNull(),
  stateId: text('state_id').references(() => states.id),
  cityId: text('city_id').references(() => cities.id),
  districtId: text('district_id').references(() => districts.id),
  jobType: text('job_type', { enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'] }).notNull(),
  experienceLevel: text('experience_level', { enum: ['entry', 'junior', 'mid', 'senior', 'lead', 'executive'] }).notNull(),
  educationLevel: text('education_level', { enum: ['high-school', 'bachelor', 'master', 'phd', 'none'] }),
  industryId: text('industry_id').references(() => industries.id),
  skillsRequired: text('skills_required'), // JSON string array
  benefits: text('benefits'), // JSON string array
  applicationDeadline: integer('application_deadline', { mode: 'timestamp' }),
  status: text('status', { enum: ['draft', 'published', 'paused', 'closed', 'expired'] }).notNull().default('draft'),
  viewsCount: integer('views_count').notNull().default(0),
  applicationsCount: integer('applications_count').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}); 