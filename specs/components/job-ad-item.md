# Job Ad Item Component

## Overview
The Job Ad Item component is a reusable card component used to display job advertisement information in list views, providing users with essential job details while maintaining a clean and scannable interface.

## Component Purpose
- Display job advertisements in list/grid layouts
- Provide quick overview of job opportunities
- Enable users to access detailed job information
- Support job application and bookmarking actions

## Component Structure

### 1. Job Information Display
- **Company logo**: Small company logo or placeholder icon
- **Job title**: Prominent, clickable job title
- **Company name**: Company name with link to company profile
- **Location**: Job location with location icon
- **Job type**: Full-time, Part-time, Contract, etc. with badge styling
- **Salary range**: Salary information (if available) with currency formatting
- **Posted date**: "Posted X days ago" format
- **Application Status**: Visual indicator showing application status for authenticated users (Applied, Saved, Viewed, etc.)

### 2. Quick Actions
- **"See Details" button**: Primary action to view complete job details
- **Bookmark/Save button**: Heart icon to save job for later

### 3. Visual Design
- **Card layout**: Clean card with subtle shadow and rounded corners
- **Hover effects**: Subtle elevation and color changes on hover
- **Responsive design**: Adapts to different screen sizes
- **Status indicators**: Visual cues for new, urgent, or featured jobs

## Interaction Behavior

### Click Actions
- **Company name click**: Navigates to company profile page in new tab/window
- **"See Details" button**: Opens comprehensive job details sheet
- **Bookmark button**: Toggles job save status with animation

### Sheet Content (Job Details)
When "See Details" is clicked, opens the Job Ad Detail component (see `@job-ad-detail.md` for complete specifications)

## Technical Specifications

### Props Interface
```typescript
interface JobAdItemProps {
  job: JobListItem; // Use shared type from @types/job
  isSaved?: boolean;
  onSave?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
}
```

### Styling Guidelines
- **Typography**: Clear hierarchy with job title as primary text using Tailwind CSS
- **Colors**: Consistent with custom theme tokens and brand guidelines
- **Spacing**: Adequate padding and margins using Tailwind spacing scale
- **Icons**: Use `lucide-react` icons for consistency with proper sizing
- **Shadows**: Subtle elevation using Tailwind shadow classes
- **Animations**: Smooth hover effects and transitions using Framer Motion

### Responsive Behavior
- **Desktop**: Full card layout with all information visible
- **Tablet**: Slightly condensed layout
- **Mobile**: Stacked layout with essential information prioritized

## User Experience Goals
- **Quick scanning**: Users can quickly assess job relevance
- **Clear hierarchy**: Most important information stands out
- **Intuitive actions**: Obvious next steps for interested users
- **Consistent behavior**: Predictable interactions across the platform
- **Accessibility**: WCAG 2.1 AA compliant with proper focus management

## Performance Considerations
- **Lazy loading**: Images load on demand
- **Optimized rendering**: Efficient re-renders with React.memo
- **Image optimization**: Compressed and properly sized company logos
- **Smooth animations**: 60fps transitions for interactions