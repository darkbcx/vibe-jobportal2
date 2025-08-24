import { useAppQuery, useAppMutation, useInvalidateQueries, queryKeys } from './use-query'
import { fetchJobs, fetchJobById, createJob, updateJob, deleteJob, type UpdateJobInput } from '@/lib/api/jobs'

// Hook to fetch all jobs
export function useJobs() {
  return useAppQuery({
    queryKey: queryKeys.jobs.all,
    queryFn: fetchJobs,
  })
}

// Hook to fetch a single job by ID
export function useJob(id: string) {
  return useAppQuery({
    queryKey: queryKeys.jobs.byId(id),
    queryFn: () => fetchJobById(id),
    enabled: !!id, // Only run query if ID is provided
  })
}

// Hook to fetch jobs by company
export function useJobsByCompany(companyId: string) {
  return useAppQuery({
    queryKey: queryKeys.jobs.byCompany(companyId),
    queryFn: () => fetchJobs(), // You can modify this to filter by company
    enabled: !!companyId,
  })
}

// Hook to fetch jobs by location
export function useJobsByLocation(locationId: string) {
  return useAppQuery({
    queryKey: queryKeys.jobs.byLocation(locationId),
    queryFn: () => fetchJobs(), // You can modify this to filter by location
    enabled: !!locationId,
  })
}

// Hook to create a new job
export function useCreateJob() {
  const { invalidateJobs, invalidateCompanies } = useInvalidateQueries()
  
  return useAppMutation({
    mutationFn: createJob,
    onSuccess: () => {
      // Invalidate related queries to refetch data
      invalidateJobs()
      invalidateCompanies()
    },
  })
}

// Hook to update a job
export function useUpdateJob() {
  const { invalidateJobs, invalidateCompanies } = useInvalidateQueries()
  
  return useAppMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobInput }) => 
      updateJob(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific job and related queries
      invalidateJobs()
      invalidateCompanies()
    },
  })
}

// Hook to delete a job
export function useDeleteJob() {
  const { invalidateJobs, invalidateCompanies } = useInvalidateQueries()
  
  return useAppMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      // Invalidate related queries to refetch data
      invalidateJobs()
      invalidateCompanies()
    },
  })
}

// Hook to get job statistics (example of derived data)
export function useJobStats() {
  const { data: jobs, isLoading, error } = useJobs()
  
  const stats = jobs ? {
    total: jobs.length,
    active: jobs.filter(job => job.status === 'published').length,
    remote: jobs.filter(job => job.location.type === 'remote').length,
  } : null
  
  return {
    stats,
    isLoading,
    error,
  }
}
