# Footer Component

## Overview
The footer component provides essential links, information, and resources for users across all pages of the Vibe Job Portal, serving as a comprehensive navigation and information hub.

## Component Structure

### 1. Main Footer Content (4-Column Layout)

#### Column 1: Company Information
- **Company logo and name**: "Vibe Job Portal"
- **Tagline**: Brief description of the platform
- **About us**: Link to company story and mission
- **Contact email**: support@vibejobportal.com
- **Phone number**: Customer support line

#### Column 2: For Job Seekers
- **Section title**: "For Job Seekers"
- **Links**:
  - Browse Jobs
  - Create Profile
  - Resume Builder
  - Career Advice
  - Job Alerts
  - Application Tracking

#### Column 3: For Employers
- **Section title**: "For Employers"
- **Links**:
  - Post a Job
  - Browse Candidates
  - Pricing Plans
  - Employer Resources
  - Company Dashboard
  - Recruitment Tools

#### Column 4: Resources & Support
- **Section title**: "Resources & Support"
- **Links**:
  - Help Center
  - FAQ
  - Privacy Policy
  - Terms of Service
  - Cookie Policy
  - Contact Support

### 2. Social Media Section
- **Section title**: "Follow Us"
- **Social media icons**:
  - LinkedIn
  - Twitter/X
  - Facebook
  - Instagram
  - YouTube
- **Newsletter signup**: Email subscription for updates

### 3. Bottom Footer Bar
- **Copyright notice**: "© 2024 Vibe Job Portal. All rights reserved."
- **Additional links**:
  - Sitemap
  - Accessibility Statement
  - Data Protection
- **Language selector**: Dropdown for multiple languages

## Technical Specifications

### Layout & Design
- **Responsive grid**: 4-column layout on desktop, stacks on mobile using Tailwind CSS
- **Color scheme**: Consistent with custom theme tokens and brand guidelines
- **Typography**: `font-sans`, `text-sm` base with proper hierarchy and spacing
- **Spacing**: Adequate padding and margins using Tailwind spacing scale
- **Icons**: Via `lucide-react` with consistent sizing

### Functionality
- **Smooth scrolling**: Links to page sections scroll smoothly using Framer Motion
- **External links**: Social media links open in new tabs with proper rel attributes
- **Email links**: Contact emails open default email client
- **Newsletter integration**: Email signup with validation and error handling

### Mobile Responsive
- **Stacked layout**: Columns stack vertically on mobile using Tailwind responsive classes
- **Touch-friendly**: All links sized for mobile interaction (minimum 44px touch target)
- **Collapsible sections**: Optional accordion-style on mobile with smooth animations

## Content Guidelines

### Link Organization
- **Logical grouping**: Related links grouped together
- **Clear labeling**: Descriptive link text
- **Consistent naming**: Uniform terminology across sections

### Information Architecture
- **User-centric**: Organized by user needs and goals
- **Progressive disclosure**: Most important links prominently placed
- **Contextual relevance**: Links relevant to user journey

## User Experience Goals
- **Easy navigation**: Quick access to important pages
- **Trust building**: Professional appearance and comprehensive information
- **Accessibility**: WCAG 2.1 AA compliant
- **Cross-platform**: Consistent experience across devices
- **Performance**: Fast loading with optimized assets
