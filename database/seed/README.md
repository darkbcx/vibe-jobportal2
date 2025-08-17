# Database Seed Structure

This directory contains comprehensive seed data for the job portal database, organized into separate files based on their respective schemas.

## Seed Files

### 📍 `locations.ts`
Seeds location-related data:
- **States**: 10 US states (CA, NY, TX, FL, WA, IL, OH, GA, NC, MI)
- **Cities**: 14 major cities across these states
- **Districts**: 25+ districts/neighborhoods within cities

### 🏭 `industries.ts`
Seeds industry data:
- **Industries**: 20 comprehensive industry categories
- Covers major sectors: Technology, Finance, Healthcare, Education, Retail, Manufacturing, etc.

### 👥 `users.ts`
Seeds user-related data:
- **Company Users**: 5 company accounts with profiles
- **Job Seeker Users**: 8 job seekers with detailed profiles
- **Admin Users**: 1 admin account
- **Job Seeker Profiles**: Complete profiles with skills, experience, education
- **Company Profiles**: Detailed company information including size, industry, location

### 🏢 `companies.ts`
Seeds standalone company data:
- **Companies**: 10 major companies (Meta, Google, Amazon, Apple, Microsoft, etc.)
- **Company Reviews**: 8 detailed reviews with ratings, pros/cons

### 💼 `jobs.ts`
Seeds job posting data:
- **Job Postings**: 10 diverse job positions
- Covers various roles: Senior Frontend Developer, Product Manager, DevOps Engineer, etc.
- Includes detailed requirements, responsibilities, benefits, and salary ranges
- Different experience levels: entry, junior, mid, senior
- Various job types: full-time, internship
- Multiple location types: remote, hybrid, onsite

### 📝 `applications.ts`
Seeds job application data:
- **Applications**: 15+ realistic job applications
- Various application statuses: applied, reviewing, shortlisted, interviewed, offered, rejected
- Includes cover letters, notes, ratings, and timestamps
- Realistic application scenarios and outcomes

### 🔗 `misc.ts`
Seeds miscellaneous user interaction data:
- **Saved Jobs**: Job seekers' saved/bookmarked positions
- **Search History**: Realistic search queries with filters and result counts
- **Saved Searches**: Named search queries that users can reuse

### 🌱 `index.ts`
Main orchestrator file that:
- Imports all seed functions
- Executes seeding in proper dependency order
- Provides comprehensive logging and error handling
- Shows summary statistics of seeded data

## Usage

Run the seed script from the database package directory:

```bash
cd packages/database
npm run seed
# or
yarn seed
```

## Seeding Order

The seeding follows a specific order to respect foreign key relationships:

1. **Locations** (independent)
2. **Industries** (independent)  
3. **Users** (independent, includes profiles)
4. **Companies** (depends on users for reviews)
5. **Jobs** (depends on users, industries, locations)
6. **Applications** (depends on jobs, users)
7. **Miscellaneous** (depends on jobs, users)

## Data Volume

The complete seed generates:
- 20 industries
- 5 company users + 10 standalone companies
- 8 job seeker users (with profiles)
- 1 admin user
- 10 job postings
- 15+ job applications
- Extensive location data (10 states, 14 cities, 25+ districts)
- Rich user interaction data (saved jobs, searches, history)

## Realistic Data

All seed data is designed to be realistic and representative of a real job portal:
- **Authentic job descriptions** with proper requirements and responsibilities
- **Realistic salary ranges** based on market rates
- **Diverse geographic coverage** across major US metropolitan areas
- **Varied company sizes** from startups to enterprises
- **Comprehensive skill sets** and technologies
- **Believable user interactions** and application scenarios

This comprehensive seed data provides an excellent foundation for development, testing, and demonstrations of the job portal functionality.
