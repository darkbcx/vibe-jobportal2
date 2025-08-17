# Home Page

## Overview
The home page serves as the primary landing page for the Vibe Job Portal website, designed to provide users with immediate access to key features and job opportunities.

## Page Layout

### Header Component
- **Implementation**: Uses the header component defined in [here](../components/header.md)
- **Features**: 
  - Logo & branding
  - Main navigation menu
  - Search functionality
  - User authentication section
  - Mobile responsive design

### Main Content Sections

### 1. Hero Section
- **Main headline**: Compelling tagline about finding your dream job
- **Sub-headline**: Brief description of the platform's value proposition
- **Call-to-action buttons**:
  - "Find Jobs" - redirects to job search page
  - "Post a Job" - redirects to job posting form (for employers)
- **Background**: Professional imagery or gradient design

### 2. Featured Jobs Section
- **Section title**: "Featured Opportunities"
- **Content**: 
  - Display top 5 featured job postings
  - Each job card shows: company logo, job title, company name, location, salary range, job type
  - "View All Featured Jobs" button - redirects to featured jobs listing page
- **Layout**: Grid or card-based layout with hover effects

### 3. Job Categories Section
- **Section title**: "Browse by Category"
- **Content**:
  - Icon-based category grid (showing top 4 categories)
  - Categories include: Technology, Healthcare, Finance, Marketing
  - Each category shows: icon, category name, job count
  - Clicking any category redirects to filtered job listings
  - "View All Categories" button - redirects to categories listing page
- **Layout**: Responsive grid with category cards (2x2 grid for 4 categories)

### 4. Quick Actions Section
- **Section title**: "Get Started"
- **Content**:
  - "Upload Resume" - for job seekers
  - "Search Jobs" - quick search functionality
  - "Post a Job" - for employers
  - "Create Account" - registration option

### 5. Statistics Section (Optional)
- **Content**: Key metrics like "X jobs posted", "Y companies hiring", "Z successful placements"
- **Purpose**: Build trust and credibility

### Footer Component
- **Implementation**: Uses the footer component defined in [here](../components/footer.md)
- **Features**:
  - 4-column layout with company info, job seeker resources, employer resources, and support
  - Social media section with newsletter signup
  - Bottom footer bar with copyright and additional links
  - Mobile responsive design

## Technical Requirements

### Architecture & Components
- **Server Components**: Use `page.tsx` as server component wrapper for metadata
- **Client Components**: Use `page-client.tsx` for interactive functionality
- **Component Organization**: Place page-specific components in `components/pages/website/`
- **Shared Components**: Use components from `components/shared/` for cross-page functionality

### Responsive Design
- **Mobile-first approach** with Tailwind CSS breakpoints
- **Breakpoints**: Mobile (default), Tablet (sm:), Desktop (lg:)
- **Touch-friendly interface** for mobile users
- **Framer Motion** for smooth animations and micro-interactions

### Performance
- **Fast loading times** with Next.js 15 optimizations
- **Optimized images and assets** with Next.js Image component
- **Lazy loading** for job listings and non-critical content
- **SSR and static streaming** for optimal performance

### Accessibility
- **WCAG 2.1 AA compliance** as per project standards
- **Keyboard navigation support** with proper focus management
- **Screen reader compatibility** with semantic HTML
- **High contrast options** via Tailwind CSS theme tokens

## User Experience Goals
- Clear visual hierarchy
- Intuitive navigation
- Fast access to key features
- Engaging but professional design
- Clear call-to-action elements
