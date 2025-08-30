# Vibe Job Portal - AI Context Guide

## 🎯 Project Overview

This is a modern job portal built with Next.js 15, TypeScript, Tailwind CSS, and Drizzle ORM. The project follows a monorepo structure with Yarn workspaces.

## 📚 Key Reference Files

### Feature Specifications

- **`specs/features/feature-auth.md`** - Authentication system specifications
- **`specs/features/feature-job-mgmt.md`** - Job management features
- **`specs/features/feature-jobseeker.md`** - Job seeker functionality
- **`specs/features/feature-company.md`** - Company/employer features
- **`specs/features/feature-summaries.md`** - Feature summaries and overview

### Page & Component Specifications

- **`specs/pages/home.md`** - Home page layout and content specifications
- **`specs/components/header.md`** - Header component specifications
- **`specs/components/footer.md`** - Footer component specifications
- **`specs/components/job-ad-item.md`** - Job listing item component specifications
- **`specs/components/job-ad-detail.md`** - Job detail sheet/modal component specifications

## 🚀 Always Reference

When generating code, ALWAYS check:

1. Relevant `.md` files in `specs/features/` folder for feature details
2. Relevant `.md` files in `specs/pages/` folder for page layout specifications
3. Relevant `.md` files in `specs/components/` folder for component specifications
4. Follow the established project structure and naming conventions
5. Use the specified tech stack and UI/UX guidelines

---

# Job Portal Project Vibe

## Goal

Build a Job Portal where users can register as a job seeker or a company. Priority is speed, simplicity, and modern, minimal UI.

## Vibe Definition

| Element   | Description                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Visual    | Whitespace-heavy, rounded corners, pastel or soft accent colors. Feels clean and airy.                                       |
| UX        | Minimal friction. Avoid modal traps. Use sheet for any sub-page forms or information. Everything should feel one-click-away. |
| Tone      | Friendly, creator-focused, informal but clear. Encouraging and supportive.                                                   |
| Tech Feel | Fast, responsive, almost "magically light". Prefers SSR or statically streamed content. Smooth animations.                   |

## User Archetypes

### Job Seeker

- **Primary Goal**: Find and apply to relevant job opportunities quickly and effortlessly
- **Pain Points**:
  - Overwhelming application processes
  - Difficulty finding jobs that match their skills
  - Lack of feedback on applications
  - Time-consuming profile setup
- **Behavior Patterns**:
  - Wants to browse jobs without creating an account initially
  - Prefers one-click applications when possible
  - Values clear job descriptions and requirements
  - Appreciates application status tracking
- **Success Metrics**:
  - Time to find relevant jobs
  - Application completion rate
  - Response rate from employers
  - Time from application to interview

### Company/Employer

- **Primary Goal**: Find qualified candidates efficiently and manage hiring pipeline seamlessly
- **Pain Points**:
  - Receiving too many unqualified applications
  - Difficulty standing out among competitors
  - Complex posting and management processes
  - Poor candidate communication tools
- **Behavior Patterns**:
  - Wants to post jobs quickly with minimal friction
  - Needs clear candidate filtering and sorting
  - Values candidate quality over quantity
  - Prefers integrated communication tools
- **Success Metrics**:
  - Time to fill positions
  - Quality of applications received
  - Candidate response rates
  - Cost per hire

### Admin

- **Primary Goal**: Maintain platform quality, resolve disputes, and ensure delightful user experience
- **Pain Points**:
  - Manual moderation of content and users
  - Difficulty identifying and resolving issues quickly
  - Lack of comprehensive platform analytics
  - Complex user management tools
- **Behavior Patterns**:
  - Needs quick access to user reports and flags
  - Wants efficient tools for content moderation
  - Values clear audit trails and user history
  - Prefers automated alerts for critical issues
- **Success Metrics**:
  - Response time to user issues
  - Platform uptime and performance
  - User satisfaction scores
  - Content quality maintenance

## Rules and Constraints

### UX

- Keep flows linear and intuitive (not multi-modal)
- Embed delightful progression wherever possible (progress bars, completion dots, micro-animations)
- Use dialog for prompt and alert with smooth transitions
- Use toaster for info and error with subtle animations
- Use sheet for any additional info and form derived from page component
- Multi language support with seamless switching

### UI

- Tailwind + shadcn/ui with custom theme tokens
- Use Framer Motion for major component entries and micro-interactions
- Typography: `font-sans`, `text-sm` base, large `text-3xl` headers with proper spacing
- Icons via `lucide-react` with optional animations
- Tiptap Editor as rich text editor with custom styling

### Coding Patterns

- Use `app/` dir with server components for pages, client components for interactions
- For most pages, implement `page.tsx` as a server component to enable easy page metadata configuration and initial data fetching. Use client components for interactive elements and data-heavy operations that require client-side state management.
- For client components, use Tanstack Query for state management
- Put shared components in `components` folder
  - Put page specific components in `components/pages/[page-name]` folder
  - As the application and pages evolve, shared components may be moved between folders within `components` folder for better organization. Remember to update all import statements in the pages that use these components to avoid errors.
- Use PascalCase for Class name
- Use camelCase for function and variable name
- Use kebab-case for table and field name
- Keep code as modular and maintainable as possible
- Decouple frontend from backend implementation
  - Create client-side API layer as functions and let these functions handle the API calls
  - Frontend must call these functions, not the API endpoints directly
- Convert database schema into TypeScript types and store them in `packages/shared/types` folder
  - Use these types as the single source of truth for all type definitions
  - Extend, pick, omit, or make partial from existing types rather than creating new ones
- For Tanstack Query usage, organize queries by category in dedicated files within a specific folder structure for better maintainability and organization

## Tech Stack

| Area             | Tech                             |
| ---------------- | -------------------------------- |
| UI               | Next.js 15, Tailwind, Shadcn     |
| State Management | Tanstack Query, Context Provider |
| Backend          | API router, Drizzle ORM          |
| Auth             | Auth.js (NextAuth.js)            |
| DB               | SQLite via Drizzle               |
| Storage          | Local `storage` folder           |

## Project Structure

### Monorepo Architecture

```
vibe-jobportal2/
├── app/                               # Next.js App Router directory
│   ├── (auth)/                        # Route group: Authentication pages
│   │       └── layout.tsx             # Layout for auth pages
│   ├── (website)/                     # Route group: Public website pages
│   │       └── layout.tsx             # Layout for Public website pages
│   ├── company/                       # Protected routes: Company dashboard and management
│   │       └── layout.tsx             # Layout for logged in company pages. Auth checking happens here
│   ├── jobseeker/                     # Protected routes: Job seeker dashboard and profile
│   │       └── layout.tsx             # Layout for logged in jobseeker pages. Auth checking happens here
│   ├── api/                           # API routes for server-side functionality
│   │   └── auth/                      # Auth.js API routes
│   │       ├── [...nextauth]/         # NextAuth.js main route
│   │       └── register/              # Custom registration endpoint
│   └── layout.tsx                     # root layout with app-wide providers
├── components/                        # Reusable React components
│   ├── ui/                            # shadcn/ui base components
│   ├── pages/                         # Page-specific components organized by route
│   │   ├── auth/                      # Authentication-related components
│   │   ├── company/                   # Company dashboard components
│   │   ├── jobseeker/                 # Job seeker dashboard components
│   │   └── website/                   # Public website components
│   └── shared/                        # Shared components used across multiple pages
├── lib/                               # Utility functions and configurations
│   ├── hooks/                         # Custom React hooks including useAuth
│   └── db.ts                          # Database connection
├── providers/                         # React context providers
│   ├── auth-provider.tsx              # NextAuth SessionProvider wrapper
│   ├── query-provider.tsx             # Tanstack Query provider
│   └── index.tsx                      # Provider composition
├── types/                             # TypeScript type definitions
│   └── next-auth.d.ts                 # NextAuth type extensions
├── database/                          # Database schema and migration management
│   ├── schema/                        # Drizzle ORM schema definitions
│   │   ├── users.ts                   # User schema with Auth.js compatibility
│   │   ├── sessions.ts                # Auth.js session schema
│   │   ├── accounts.ts                # Auth.js account schema for OAuth
│   │   └── verificationTokens.ts      # Auth.js verification tokens
│   ├── migrations/                    # Auto-generated SQL migration files
│   └── seed/                          # Database seeding scripts
├── middleware.ts                      # NextAuth middleware for route protection
└── specs/                             # Project specifications (Markdown files)
    ├── features/                      # Feature specifications
    │   ├── feature-auth.md           # Authentication system specs
    │   ├── feature-job-mgmt.md       # Job management specs
    │   ├── feature-jobseeker.md      # Job seeker functionality specs
    │   ├── feature-company.md        # Company/employer specs
    │   └── feature-summaries.md      # Feature summaries
    ├── pages/                         # Page layout specifications
    │   └── home.md                   # Home page specifications
    └── components/                    # Component specifications
        ├── header.md                 # Header component specs
        ├── footer.md                 # Footer component specs
        ├── job-ad-item.md           # Job listing item component specs
        └── job-ad-detail.md         # Job detail sheet/modal component specs
```

### Key Organizational Principles

- **Route Groups**: Use Next.js route groups `(auth)`, `(website)` to organize related pages without affecting URL structure
- **Role-Based Structure**: Separate app directories for different user roles (`company/`, `jobseeker/`)
- **Component Hierarchy**: Organize components from generic (`ui/`) to specific (`pages/`) to shared (`shared/`)
- **Separation of Concerns**: Each package has a clear, single responsibility
- **Shared Dependencies**: Common utilities and types are centralized in the `shared` package
- **Scalable Structure**: Easy to add new packages (mobile app, admin dashboard, etc.) in the future
- **Consistent Naming**: Follow established naming conventions across all packages
- **Clear Boundaries**: Each package can be developed and tested independently
- **Type Safety**: TypeScript types are shared and consistently used across packages

## 🔧 Development Commands

- `yarn dev` - Start development server
- `yarn db:generate` - Generate database migrations
- `yarn db:migrate` - Apply database migrations
- `yarn db:seed` - Seed database with sample data
- `yarn build` - Build for production

### Auth.js Development

- **Environment Setup**: Create `.env.local` with NextAuth configuration
- **Database Migrations**: Run after schema changes for Auth.js compatibility
- **Session Testing**: Use browser dev tools to inspect NextAuth sessions
- **Protected Routes**: Test role-based access control in development
