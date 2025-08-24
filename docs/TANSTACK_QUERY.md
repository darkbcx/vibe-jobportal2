# TanStack Query Setup and Usage

This project is configured with TanStack Query (formerly React Query) for efficient data fetching, caching, and state management.

## What's Already Installed

- `@tanstack/react-query` - Core library
- `@tanstack/react-query-devtools` - Development tools for debugging

## Provider Setup

The `QueryProvider` is already configured in `app/provider.tsx` and wraps your entire application. It includes:

- Optimized default settings for queries and mutations
- React Query DevTools (accessible in development)
- Proper error handling and retry logic

## Key Features

### 1. Query Keys Organization

All query keys are centralized in `lib/hooks/use-query.ts`:

```typescript
export const queryKeys = {
  jobs: {
    all: ['jobs'] as const,
    byId: (id: string) => ['jobs', id] as const,
    byCompany: (companyId: string) => ['jobs', 'company', companyId] as const,
    // ... more
  },
  // ... other entities
}
```

### 2. Custom Hooks

Use the pre-configured hooks for consistent behavior:

```typescript
import { useAppQuery, useAppMutation } from '@/lib/hooks/use-query'

// For queries
const { data, isLoading, error } = useAppQuery({
  queryKey: queryKeys.jobs.all,
  queryFn: fetchJobs,
})

// For mutations
const createJobMutation = useAppMutation({
  mutationFn: createJob,
  onSuccess: () => {
    // Handle success
  },
})
```

### 3. Job-Specific Hooks

Ready-to-use hooks for job operations:

```typescript
import { useJobs, useCreateJob, useUpdateJob } from '@/lib/hooks/use-jobs'

// Fetch all jobs
const { data: jobs, isLoading } = useJobs()

// Create a job
const createJob = useCreateJob()
createJob.mutate(jobData)

// Update a job
const updateJob = useUpdateJob()
updateJob.mutate({ id: 'job-id', data: updateData })
```

## Usage Examples

### Basic Query

```typescript
import { useJobs } from '@/lib/hooks/use-jobs'

function JobList() {
  const { data: jobs, isLoading, error } = useJobs()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {jobs?.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
```

### Mutation with Optimistic Updates

```typescript
import { useUpdateJob } from '@/lib/hooks/use-jobs'
import { useQueryClient } from '@tanstack/react-query'

function JobForm({ job }) {
  const queryClient = useQueryClient()
  const updateJob = useUpdateJob()

  const handleSubmit = (data) => {
    updateJob.mutate(
      { id: job.id, data },
      {
        onMutate: async (newData) => {
          // Cancel outgoing refetches
          await queryClient.cancelQueries({ queryKey: queryKeys.jobs.byId(job.id) })

          // Snapshot previous value
          const previousJob = queryClient.getQueryData(queryKeys.jobs.byId(job.id))

          // Optimistically update
          queryClient.setQueryData(queryKeys.jobs.byId(job.id), {
            ...job,
            ...newData.data,
          })

          return { previousJob }
        },
        onError: (err, newData, context) => {
          // Rollback on error
          queryClient.setQueryData(queryKeys.jobs.byId(job.id), context?.previousJob)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

### Dependent Queries

```typescript
import { useJob, useCompany } from '@/lib/hooks/use-jobs'

function JobDetail({ jobId }) {
  const { data: job } = useJob(jobId)
  const { data: company } = useCompany(job?.companyId)

  // Company query only runs after job is loaded
  if (!job) return <div>Loading job...</div>
  if (!company) return <div>Loading company...</div>

  return (
    <div>
      <h1>{job.title}</h1>
      <p>Company: {company.name}</p>
    </div>
  )
}
```

## Best Practices

1. **Use the provided hooks** instead of raw `useQuery`/`useMutation`
2. **Centralize query keys** in the `queryKeys` object
3. **Invalidate related queries** after mutations
4. **Use optimistic updates** for better UX
5. **Handle loading and error states** consistently
6. **Enable queries conditionally** with the `enabled` option

## Development Tools

The React Query DevTools are automatically included in development mode. You can:

- View all active queries
- Inspect query data and metadata
- Manually trigger refetches
- Monitor query performance

## Configuration

Default settings are optimized for your use case:

- **Stale time**: 1 minute (data considered fresh for 1 minute)
- **GC time**: 10 minutes (data kept in cache for 10 minutes)
- **Retry**: 1 attempt on failure
- **Refetch on window focus**: Disabled for better UX

You can override these defaults in individual queries when needed.
