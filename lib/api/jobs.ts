import { db } from '@/lib/db'
import { jobs, companies, locations, industries } from '@/database/schema'
import { eq, desc, asc } from 'drizzle-orm'

export type JobWithRelations = typeof jobs.$inferSelect & {
  company: typeof companies.$inferSelect
  location: typeof locations.$inferSelect
  industry: typeof industries.$inferSelect
}

export type CreateJobInput = typeof jobs.$inferInsert
export type UpdateJobInput = Partial<CreateJobInput>

// Fetch all jobs with relations
export async function fetchJobs(): Promise<JobWithRelations[]> {
  try {
    const result = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        requirements: jobs.requirements,
        salary: jobs.salary,
        type: jobs.type,
        status: jobs.status,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        companyId: jobs.companyId,
        locationId: jobs.locationId,
        industryId: jobs.industryId,
        company: {
          id: companies.id,
          name: companies.name,
          description: companies.description,
          website: companies.website,
          logo: companies.logo,
          createdAt: companies.createdAt,
          updatedAt: companies.updatedAt,
        },
        location: {
          id: locations.id,
          city: locations.city,
          state: locations.state,
          country: locations.country,
          createdAt: locations.createdAt,
          updatedAt: locations.updatedAt,
        },
        industry: {
          id: industries.id,
          name: industries.name,
          description: industries.description,
          createdAt: industries.createdAt,
          updatedAt: industries.updatedAt,
        },
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .leftJoin(locations, eq(jobs.locationId, locations.id))
      .leftJoin(industries, eq(jobs.industryId, industries.id))
      .orderBy(desc(jobs.createdAt))

    return result
  } catch (error) {
    console.error('Error fetching jobs:', error)
    throw new Error('Failed to fetch jobs')
  }
}

// Fetch job by ID with relations
export async function fetchJobById(id: string): Promise<JobWithRelations | null> {
  try {
    const result = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        requirements: jobs.requirements,
        salary: jobs.salary,
        type: jobs.type,
        status: jobs.status,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        companyId: jobs.companyId,
        locationId: jobs.locationId,
        industryId: jobs.industryId,
        company: {
          id: companies.id,
          name: companies.name,
          description: companies.description,
          website: companies.website,
          logo: companies.logo,
          createdAt: companies.createdAt,
          updatedAt: companies.updatedAt,
        },
        location: {
          id: locations.id,
          city: locations.city,
          state: locations.state,
          country: locations.country,
          createdAt: locations.createdAt,
          updatedAt: locations.updatedAt,
        },
        industry: {
          id: industries.id,
          name: industries.name,
          description: industries.description,
          createdAt: industries.createdAt,
          updatedAt: industries.updatedAt,
        },
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .leftJoin(locations, eq(jobs.locationId, locations.id))
      .leftJoin(industries, eq(jobs.industryId, industries.id))
      .where(eq(jobs.id, id))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error('Error fetching job:', error)
    throw new Error('Failed to fetch job')
  }
}

// Create new job
export async function createJob(data: CreateJobInput): Promise<typeof jobs.$inferSelect> {
  try {
    const result = await db.insert(jobs).values(data).returning()
    return result[0]
  } catch (error) {
    console.error('Error creating job:', error)
    throw new Error('Failed to create job')
  }
}

// Update job
export async function updateJob(id: string, data: UpdateJobInput): Promise<typeof jobs.$inferSelect> {
  try {
    const result = await db
      .update(jobs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(jobs.id, id))
      .returning()
    return result[0]
  } catch (error) {
    console.error('Error updating job:', error)
    throw new Error('Failed to update job')
  }
}

// Delete job
export async function deleteJob(id: string): Promise<void> {
  try {
    await db.delete(jobs).where(eq(jobs.id, id))
  } catch (error) {
    console.error('Error deleting job:', error)
    throw new Error('Failed to delete job')
  }
}
