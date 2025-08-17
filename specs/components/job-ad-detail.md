# Job Ad Detail Component

## Overview
The Job Ad Detail component is a comprehensive sheet/modal component that displays complete job advertisement information when users click "See Details" from a job listing. It provides all necessary information for users to make informed decisions about job applications.

## Component Purpose
- Display complete job advertisement details
- Provide comprehensive company and role information
- Enable direct job application functionality
- Support job saving and sharing actions
- Show related job opportunities

## Component Structure

### 1. Header Section
- **Job title**: Large, prominent job title
- **Company information**: Logo, name, and industry
- **Location**: Job location with map icon
- **Job type**: Full-time, Part-time, Contract, etc. with badge
- **Salary range**: Comprehensive salary information with benefits
- **Posted date**: "Posted X days ago" format
- **Application deadline**: If applicable

### 2. Job Description Section
- **Role overview**: Executive summary of the position
- **Key responsibilities**: Detailed list of job duties
- **Required qualifications**: Essential skills and experience
- **Preferred qualifications**: Nice-to-have skills and experience
- **Education requirements**: Academic and certification requirements
- **Experience level**: Years of experience needed

### 3. Company Information Section
- **Company overview**: Description of the company
- **Company culture**: Values, mission, and work environment
- **Company size**: Number of employees
- **Industry**: Company's business sector
- **Founded**: Year company was established
- **Company benefits**: Health, retirement, perks, etc.

### 4. Application Section
- **Application instructions**: How to apply
- **Required documents**: Resume, cover letter, portfolio, etc.
- **Application deadline**: If applicable
- **Contact information**: Hiring manager or HR contact
- **Apply button**: Primary call-to-action

### 5. Additional Information
- **Work arrangement**: Remote, hybrid, or on-site
- **Travel requirements**: If applicable
- **Relocation assistance**: If offered
- **Visa sponsorship**: If available for international candidates

### 6. Related Jobs Section
- **Similar positions**: Jobs with similar requirements
- **Same company**: Other openings at the same company
- **Same location**: Jobs in the same area

## Interaction Behavior

### Primary Actions
- **Apply Now**: Initiates job application process
- **Save Job**: Bookmarks job for later reference
- **Share Job**: Share job posting via email, social media, or link
- **Contact Company**: Direct communication option
- **View Company Profile**: Navigate to company page

### Secondary Actions
- **Report Job**: Flag inappropriate or misleading content
- **Print Job**: Generate printable version
- **Email Job**: Send job details via email

## Technical Specifications

### Props Interface
```typescript
interface JobAdDetailProps {
  job: JobDetail; // Use shared type from @types/job
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
  onShare: (jobId: string) => void;
}
```
```

### Styling Guidelines
- **Typography**: Clear hierarchy with proper heading levels using Tailwind CSS
- **Colors**: Consistent with custom theme tokens and brand guidelines
- **Spacing**: Generous whitespace using Tailwind spacing scale for readability
- **Icons**: Use `lucide-react` icons for consistency with proper sizing
- **Scroll behavior**: Smooth scrolling for long content with Framer Motion
- **Sheet component**: Use shadcn/ui Sheet component for consistent behavior
- **Animations**: Smooth open/close transitions using Framer Motion

### Responsive Behavior
- **Desktop**: Full sheet with all sections visible
- **Tablet**: Condensed layout with collapsible sections
- **Mobile**: Stacked layout with essential information prioritized

## User Experience Goals
- **Comprehensive information**: All necessary details for decision-making
- **Clear application process**: Obvious next steps for interested candidates
- **Easy navigation**: Logical flow through information sections
- **Accessibility**: WCAG 2.1 AA compliant with proper focus management
- **Fast loading**: Optimized for quick content display

## Performance Considerations
- **Lazy loading**: Load content sections on demand
- **Image optimization**: Compressed company logos and images
- **Caching**: Cache job details for faster subsequent loads
- **Smooth animations**: 60fps transitions for sheet open/close

