import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'

// Common query keys for your application
export const queryKeys = {
  // Auth related queries
  auth: {
    user: ['auth', 'user'] as const,
    session: ['auth', 'session'] as const,
  },
  // Job related queries
  jobs: {
    all: ['jobs'] as const,
    byId: (id: string) => ['jobs', id] as const,
    byCompany: (companyId: string) => ['jobs', 'company', companyId] as const,
    byLocation: (locationId: string) => ['jobs', 'location', locationId] as const,
  },
  // Company related queries
  companies: {
    all: ['companies'] as const,
    byId: (id: string) => ['companies', id] as const,
    byIndustry: (industryId: string) => ['companies', 'industry', industryId] as const,
  },
  // Application related queries
  applications: {
    all: ['applications'] as const,
    byUser: (userId: string) => ['applications', 'user', userId] as const,
    byJob: (jobId: string) => ['applications', 'job', jobId] as const,
  },
  // Location related queries
  locations: {
    all: ['locations'] as const,
    byId: (id: string) => ['locations', id] as const,
  },
  // Industry related queries
  industries: {
    all: ['industries'] as const,
    byId: (id: string) => ['industries', id] as const,
  },
}

// Custom hook for invalidating related queries
export function useInvalidateQueries() {
  const queryClient = useQueryClient()
  
  return {
    invalidateJobs: () => queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all }),
    invalidateCompanies: () => queryClient.invalidateQueries({ queryKey: queryKeys.companies.all }),
    invalidateApplications: () => queryClient.invalidateQueries({ queryKey: queryKeys.applications.all }),
    invalidateLocations: () => queryClient.invalidateQueries({ queryKey: queryKeys.locations.all }),
    invalidateIndustries: () => queryClient.invalidateQueries({ queryKey: queryKeys.industries.all }),
    invalidateAll: () => queryClient.invalidateQueries(),
  }
}

// Re-export common hooks for convenience
export { useQuery, useMutation, useQueryClient }

// Type-safe wrapper for useQuery with better defaults
export function useAppQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError>
) {
  return useQuery({
    staleTime: 60 * 1000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  })
}

// Type-safe wrapper for useMutation with better defaults
export function useAppMutation<TData, TError = Error, TVariables = unknown>(
  options: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation({
    retry: 1,
    ...options,
  })
}
