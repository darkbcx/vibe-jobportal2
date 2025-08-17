import { db } from './db';
import { users, jobs, companies, applications } from './db-types';
import { eq } from 'drizzle-orm';

/**
 * Database utility functions for common operations
 */

// User operations
export async function getUserById(id: string) {
  return await db.select().from(users).where(eq(users.id, id)).get();
}

export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email)).get();
}

// Job operations
export async function getJobs(limit = 10, offset = 0) {
  return await db
    .select()
    .from(jobs)
    .limit(limit)
    .offset(offset)
    .all();
}

export async function getJobById(id: string) {
  return await db.select().from(jobs).where(eq(jobs.id, id)).get();
}

// Company operations
export async function getCompanyById(id: string) {
  return await db.select().from(companies).where(eq(companies.id, id)).get();
}

// Application operations
export async function getApplicationsByJobId(jobId: string) {
  return await db
    .select()
    .from(applications)
    .where(eq(applications.jobPostingId, jobId))
    .all();
}

export async function getApplicationsByUserId(userId: string) {
  return await db
    .select()
    .from(applications)
    .where(eq(applications.jobSeekerId, userId))
    .all();
}
