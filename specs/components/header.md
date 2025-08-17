# Header Component

## Overview
The header component serves as the primary navigation element across all pages of the Vibe Job Portal, providing consistent access to key features and user account management.

## Component Structure

### 1. Logo & Branding
- **Company logo**: Left-aligned, links to home page
- **Brand name**: "Vibe Job Portal" displayed next to logo
- **Responsive**: Logo scales appropriately on mobile devices

### 2. Main Navigation Menu
- **Menu items**:
  - Home - links to home page
  - Jobs - links to job search/browse page
  - Companies - links to company listings
  - About - links to about page
- **Active state**: Current page highlighted
- **Mobile**: Collapses into hamburger menu

### 3. Search Functionality
- **Search bar**: Prominent placement in header
- **Features**:
  - Placeholder text: "Search jobs or keywords"
  - Auto-complete suggestions
  - Search button with magnifying glass icon
  - Search results redirect to dedicated search results page
- **Mobile**: Full-width search bar

### 4. User Authentication Section

#### Unauthenticated Users
- **Register button**: 
  - Dropdown with options: "Job Seeker" and "Employer"
  - Each option redirects to respective registration page
- **Login button**: Redirects to login page
- **Styling**: Clear call-to-action buttons

#### Authenticated Users
- **User profile button**:
  - Shows user avatar (or initials if no avatar)
  - Displays user name and role (Job Seeker/Employer)
  - Click opens dropdown menu
- **Dropdown menu items**:
  - Dashboard - user's main dashboard
  - Profile - edit profile information
  - Settings - account and preference settings
  - Saved Jobs - bookmarked job listings
  - Applications - job application history (for job seekers)
  - Posted Jobs - job management (for employers)
  - Logout - sign out functionality

### 5. Mobile Responsive Design
- **Hamburger menu**: For main navigation on mobile
- **Collapsible search**: Search bar can be toggled on mobile
- **Touch-friendly**: All interactive elements sized for touch
- **Breakpoints**: Responsive design for tablet and mobile

## Technical Specifications

### Styling & Design
- **Theme**: Professional and modern design using Tailwind CSS + shadcn/ui
- **Colors**: Consistent with custom theme tokens and brand guidelines
- **Typography**: `font-sans`, `text-sm` base with proper spacing
- **Shadows**: Subtle elevation for dropdown menus using Tailwind shadow classes
- **Icons**: Via `lucide-react` with optional animations

### Functionality
- **Sticky header**: Remains visible when scrolling with backdrop blur
- **Smooth transitions**: Animated dropdowns and hover effects using Framer Motion
- **Keyboard navigation**: Full keyboard accessibility with proper focus management
- **Focus management**: Proper focus handling for dropdowns and navigation

### Performance
- **Fast rendering**: Optimized for quick page loads with Next.js 15
- **Lazy loading**: Dropdown content loads on demand
- **Caching**: User session data cached appropriately with Tanstack Query
- **Component structure**: Server component wrapper with client component for interactions

## User Experience Goals
- **Intuitive navigation**: Easy to find and use all features
- **Clear visual hierarchy**: Important elements stand out
- **Consistent behavior**: Predictable interactions across pages
- **Accessibility**: WCAG 2.1 AA compliant
- **Cross-platform**: Works seamlessly on all devices

