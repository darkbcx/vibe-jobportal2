import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { jobs } from './jobs';
import { users } from './users';

export const applications = sqliteTable('job_applications', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  jobPostingId: text('job_posting_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  jobSeekerId: text('job_seeker_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  resumeFile: text('resume_file'),
  coverLetter: text('cover_letter'),
  status: text('status', { enum: ['applied', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'] }).notNull().default('applied'),
  appliedAt: integer('applied_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  reviewedAt: integer('reviewed_at', { mode: 'timestamp' }),
  interviewScheduled: integer('interview_scheduled', { mode: 'timestamp' }),
  notes: text('notes'),
  rating: real('rating'), // 1-5 rating scale
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}); 