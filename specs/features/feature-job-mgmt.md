# Job Management

## Job posting management

### Job Posting Data Structure
- Job postings stored in `job_posting` table
- Job fields: `id`, `company_id`, `title`, `description`, `requirements`, `responsibilities`, `salary_min`, `salary_max`, `salary_currency`, `location_type`, `district`, `state`, `city`, `job_type`, `experience_level`, `education_level`, `skills_required`, `benefits`, `application_deadline`, `status`, `views_count`, `applications_count`, `created_at`, `updated_at`
- Job status: draft, published, paused, closed, expired
- Location types: remote, hybrid, onsite, flexible
- Job types: full-time, part-time, contract, internship, freelance

### Job Posting Creation and Management
- Intuitive job posting form with guided workflow
- Rich text editor for job descriptions and requirements
- Skill tagging and requirement specification
- Salary range and benefits information
- Application deadline and posting duration management
- For remote location types, `district`, `state`, `city` fields can be left empty
- Job posting templates for common roles
- Bulk job posting and management tools

### Job Posting Optimization
- ATS-friendly job posting format optimization
- Keyword optimization for better candidate matching
- Job posting performance analytics and insights
- Competitor analysis and market positioning
- Job posting A/B testing for effectiveness
- SEO optimization for external job board visibility

## Candidate management

### Candidate Data Structure
- Candidate applications stored in `job_application` table
- Application fields: `id`, `job_posting_id`, `job_seeker_id`, `resume_file`, `cover_letter`, `status`, `applied_at`, `reviewed_at`, `interview_scheduled`, `notes`, `rating`, `created_at`, `updated_at`
- Application status: applied, reviewing, shortlisted, interviewed, offered, rejected, withdrawn
- Candidate evaluation and rating system
- Application tracking and communication history

### Candidate Pipeline Management
- Visual hiring pipeline with drag-and-drop functionality
- Candidate status tracking and progression
- Automated status updates and notifications
- Candidate evaluation and rating system
- Interview scheduling and calendar integration
- Candidate communication and feedback tools

### Candidate Communication
- In-app messaging system for candidate communication
- Email templates for common communication scenarios
- Interview scheduling and confirmation tools
- Application status update notifications
- Candidate feedback and rejection communication
- Communication history and audit trail


## Job Search & Discovery

### Advanced Job Search with Multiple Filters
Job search functionality supports filtering by:
- **Salary Range**: Minimum value, maximum value, or both parameters
- **Location**: Filter by district, state, and city
- **Industry**: Filter using `industry_id` that references the `industry` table

### Saved Job Favorites
- Job favorites are stored in the `job_seeker_saved_job` table
- Table fields: `job_seeker_id`, `job_posting_id`

### Job Application History Tracking
- Display list of previously applied job postings for each job seeker

## Analytics and reporting

### Analytics Data Structure
- Company analytics stored in `company_analytics` table
- Analytics fields: `id`, `company_id`, `metric_type`, `metric_value`, `date`, `job_posting_id`, `created_at`
- Metric types: profile views, job views, applications, interviews, hires
- Time-series data for trend analysis and reporting
- Custom date range filtering and comparison

### Performance Analytics
- Company profile view analytics and trends
- Job posting performance metrics and insights
- Application quality and conversion tracking
- Time-to-hire and cost-per-hire analysis
- Candidate source and channel effectiveness
- Competitive benchmarking and market analysis

### Reporting and Insights
- Customizable dashboard with key performance indicators
- Automated report generation and scheduling
- Export functionality for data analysis
- Predictive analytics for hiring success
- ROI tracking for recruitment investments
- Industry benchmarking and best practices

## Technical Implementation

### Component Architecture
- **Server Components**: Use `page.tsx` as server component wrapper for metadata and initial data
- **Client Components**: Use `page-client.tsx` for interactive job management forms
- **Component Organization**: Place job management components in `components/pages/company/`
- **Shared Components**: Use components from `components/shared/` for cross-page functionality

### State Management
- **Tanstack Query**: For managing job data, applications, and analytics
- **Context Provider**: For global company state and user permissions
- **Local State**: For form management and UI interactions

### API Layer
- **Client-side API functions**: Create functions in `lib/api/jobs.ts` and `lib/api/applications.ts`
- **Frontend calls**: Frontend must call these functions, not API endpoints directly
- **Error handling**: Proper error handling with user-friendly messages

### Type Safety
- **Shared Types**: Use types from `@types/job`, `@types/company`, and `@types/application`
- **Type Extensions**: Extend, pick, omit, or make partial from existing types rather than creating new ones
- **Interface consistency**: Maintain consistent prop interfaces across all job management components
### Rich Text Editing
- **Tiptap Editor**: For job descriptions and requirements with custom styling
- **Content Validation**: Proper sanitization and validation of rich text content
- **Export Options**: Support for exporting job descriptions in various formats

### Analytics & Performance
- **Real-time Updates**: Live updates for job views, applications, and status changes
- **Data Visualization**: Charts and graphs using appropriate charting libraries
- **Performance Optimization**: Efficient data fetching and caching strategies

