import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { jobSeekerSavedJobs, searchHistory, savedSearches } from '../schema/industries';

export async function seedMiscellaneous(
  db: ReturnType<typeof drizzle>,
  jobIds: string[],
  jobSeekerUserIds: string[]
) {
  console.log('🔗 Seeding miscellaneous data (saved jobs, search history, saved searches)...');

  // Insert saved jobs
  const savedJobsData = [
    // John Doe saved jobs
    {
      jobSeekerId: jobSeekerUserIds[0], // John Doe
      jobPostingId: jobIds[0], // Senior Frontend Developer
    },
    {
      jobSeekerId: jobSeekerUserIds[0], // John Doe
      jobPostingId: jobIds[6], // Backend Engineer
    },
    // Jane Smith saved jobs
    {
      jobSeekerId: jobSeekerUserIds[1], // Jane Smith
      jobPostingId: jobIds[1], // Product Manager
    },
    {
      jobSeekerId: jobSeekerUserIds[1], // Jane Smith
      jobPostingId: jobIds[7], // Marketing Manager
    },
    // Mike Johnson saved jobs
    {
      jobSeekerId: jobSeekerUserIds[2], // Mike Johnson
      jobPostingId: jobIds[2], // DevOps Engineer
    },
    {
      jobSeekerId: jobSeekerUserIds[2], // Mike Johnson
      jobPostingId: jobIds[6], // Backend Engineer
    },
    // Sarah Wilson saved jobs
    {
      jobSeekerId: jobSeekerUserIds[3], // Sarah Wilson
      jobPostingId: jobIds[4], // UX/UI Designer
    },
    // David Brown saved jobs
    {
      jobSeekerId: jobSeekerUserIds[4], // David Brown
      jobPostingId: jobIds[5], // Data Scientist
    },
    {
      jobSeekerId: jobSeekerUserIds[4], // David Brown
      jobPostingId: jobIds[9], // Healthcare Data Analyst
    },
    // Lisa Garcia saved jobs
    {
      jobSeekerId: jobSeekerUserIds[5], // Lisa Garcia
      jobPostingId: jobIds[7], // Marketing Manager
    },
    {
      jobSeekerId: jobSeekerUserIds[5], // Lisa Garcia
      jobPostingId: jobIds[4], // UX/UI Designer
    },
    // Alex Chen saved jobs
    {
      jobSeekerId: jobSeekerUserIds[6], // Alex Chen
      jobPostingId: jobIds[6], // Backend Engineer
    },
    {
      jobSeekerId: jobSeekerUserIds[6], // Alex Chen
      jobPostingId: jobIds[0], // Senior Frontend Developer
    },
    // Emily Davis saved jobs
    {
      jobSeekerId: jobSeekerUserIds[7], // Emily Davis
      jobPostingId: jobIds[8], // Software Engineer Intern
    },
    {
      jobSeekerId: jobSeekerUserIds[7], // Emily Davis
      jobPostingId: jobIds[0], // Senior Frontend Developer
    },
  ];

  await db.insert(jobSeekerSavedJobs).values(savedJobsData);

  // Insert search history
  const searchHistoryData = [
    // John Doe search history
    {
      userId: jobSeekerUserIds[0],
      query: 'frontend developer react',
      filters: JSON.stringify({
        location: 'San Francisco, CA',
        salary: { min: 120000, max: 200000 },
        jobType: 'full-time',
        experienceLevel: 'senior'
      }),
      resultsCount: 15,
    },
    {
      userId: jobSeekerUserIds[0],
      query: 'typescript react senior',
      filters: JSON.stringify({
        location: 'Remote',
        jobType: 'full-time'
      }),
      resultsCount: 23,
    },
    {
      userId: jobSeekerUserIds[0],
      query: 'full stack developer',
      filters: JSON.stringify({
        experienceLevel: 'senior',
        salary: { min: 130000 }
      }),
      resultsCount: 18,
    },
    // Jane Smith search history
    {
      userId: jobSeekerUserIds[1],
      query: 'product manager',
      filters: JSON.stringify({
        location: 'New York, NY',
        experienceLevel: 'mid',
        jobType: 'full-time'
      }),
      resultsCount: 12,
    },
    {
      userId: jobSeekerUserIds[1],
      query: 'product management tech',
      filters: JSON.stringify({
        industry: 'Technology',
        salary: { min: 100000, max: 150000 }
      }),
      resultsCount: 9,
    },
    // Mike Johnson search history
    {
      userId: jobSeekerUserIds[2],
      query: 'devops engineer aws',
      filters: JSON.stringify({
        locationType: 'remote',
        experienceLevel: 'mid'
      }),
      resultsCount: 21,
    },
    {
      userId: jobSeekerUserIds[2],
      query: 'cloud infrastructure kubernetes',
      filters: JSON.stringify({
        jobType: 'full-time',
        salary: { min: 110000 }
      }),
      resultsCount: 16,
    },
    // Sarah Wilson search history
    {
      userId: jobSeekerUserIds[3],
      query: 'ux ui designer',
      filters: JSON.stringify({
        location: 'Los Angeles, CA',
        experienceLevel: 'mid'
      }),
      resultsCount: 14,
    },
    {
      userId: jobSeekerUserIds[3],
      query: 'user experience design',
      filters: JSON.stringify({
        locationType: 'hybrid',
        jobType: 'full-time'
      }),
      resultsCount: 19,
    },
    // David Brown search history
    {
      userId: jobSeekerUserIds[4],
      query: 'data scientist machine learning',
      filters: JSON.stringify({
        educationLevel: 'phd',
        salary: { min: 140000 }
      }),
      resultsCount: 8,
    },
    {
      userId: jobSeekerUserIds[4],
      query: 'python data analysis',
      filters: JSON.stringify({
        locationType: 'remote',
        experienceLevel: 'senior'
      }),
      resultsCount: 25,
    },
    // Lisa Garcia search history
    {
      userId: jobSeekerUserIds[5],
      query: 'marketing manager digital',
      filters: JSON.stringify({
        location: 'Chicago, IL',
        experienceLevel: 'junior'
      }),
      resultsCount: 11,
    },
    {
      userId: jobSeekerUserIds[5],
      query: 'social media marketing',
      filters: JSON.stringify({
        jobType: 'full-time',
        industry: 'Marketing & Advertising'
      }),
      resultsCount: 17,
    },
    // Alex Chen search history
    {
      userId: jobSeekerUserIds[6],
      query: 'backend engineer java',
      filters: JSON.stringify({
        location: 'Austin, TX',
        experienceLevel: 'mid'
      }),
      resultsCount: 13,
    },
    {
      userId: jobSeekerUserIds[6],
      query: 'spring boot microservices',
      filters: JSON.stringify({
        jobType: 'full-time',
        salary: { min: 120000 }
      }),
      resultsCount: 10,
    },
    // Emily Davis search history
    {
      userId: jobSeekerUserIds[7],
      query: 'software engineer intern',
      filters: JSON.stringify({
        jobType: 'internship',
        experienceLevel: 'entry'
      }),
      resultsCount: 7,
    },
    {
      userId: jobSeekerUserIds[7],
      query: 'entry level developer',
      filters: JSON.stringify({
        experienceLevel: 'entry',
        educationLevel: 'bachelor'
      }),
      resultsCount: 22,
    },
  ];

  await db.insert(searchHistory).values(searchHistoryData);

  // Insert saved searches
  const savedSearchesData = [
    // John Doe saved searches
    {
      userId: jobSeekerUserIds[0],
      name: 'Senior Frontend in SF',
      query: 'frontend developer react typescript',
      filters: JSON.stringify({
        location: 'San Francisco, CA',
        experienceLevel: 'senior',
        salary: { min: 140000 },
        jobType: 'full-time'
      }),
    },
    {
      userId: jobSeekerUserIds[0],
      name: 'Remote React Jobs',
      query: 'react typescript',
      filters: JSON.stringify({
        locationType: 'remote',
        experienceLevel: 'senior'
      }),
    },
    // Jane Smith saved searches
    {
      userId: jobSeekerUserIds[1],
      name: 'PM Jobs NYC',
      query: 'product manager',
      filters: JSON.stringify({
        location: 'New York, NY',
        experienceLevel: 'mid',
        industry: 'Technology'
      }),
    },
    // Mike Johnson saved searches
    {
      userId: jobSeekerUserIds[2],
      name: 'Remote DevOps',
      query: 'devops engineer',
      filters: JSON.stringify({
        locationType: 'remote',
        experienceLevel: 'mid'
      }),
    },
    {
      userId: jobSeekerUserIds[2],
      name: 'Cloud Infrastructure',
      query: 'aws kubernetes docker',
      filters: JSON.stringify({
        jobType: 'full-time',
        salary: { min: 120000 }
      }),
    },
    // Sarah Wilson saved searches
    {
      userId: jobSeekerUserIds[3],
      name: 'UX Designer LA',
      query: 'ux ui designer',
      filters: JSON.stringify({
        location: 'Los Angeles, CA',
        experienceLevel: 'mid'
      }),
    },
    // David Brown saved searches
    {
      userId: jobSeekerUserIds[4],
      name: 'Senior Data Science',
      query: 'data scientist',
      filters: JSON.stringify({
        experienceLevel: 'senior',
        educationLevel: 'phd',
        salary: { min: 150000 }
      }),
    },
    {
      userId: jobSeekerUserIds[4],
      name: 'ML Remote Jobs',
      query: 'machine learning',
      filters: JSON.stringify({
        locationType: 'remote',
        experienceLevel: 'senior'
      }),
    },
    // Lisa Garcia saved searches
    {
      userId: jobSeekerUserIds[5],
      name: 'Digital Marketing',
      query: 'marketing manager digital',
      filters: JSON.stringify({
        experienceLevel: 'junior',
        industry: 'Marketing & Advertising'
      }),
    },
    // Alex Chen saved searches
    {
      userId: jobSeekerUserIds[6],
      name: 'Backend Java Austin',
      query: 'backend engineer java',
      filters: JSON.stringify({
        location: 'Austin, TX',
        experienceLevel: 'mid'
      }),
    },
    // Emily Davis saved searches
    {
      userId: jobSeekerUserIds[7],
      name: 'Internships',
      query: 'intern',
      filters: JSON.stringify({
        jobType: 'internship',
        experienceLevel: 'entry'
      }),
    },
    {
      userId: jobSeekerUserIds[7],
      name: 'Entry Level Tech',
      query: 'entry level software',
      filters: JSON.stringify({
        experienceLevel: 'entry',
        industry: 'Technology'
      }),
    },
  ];

  await db.insert(savedSearches).values(savedSearchesData);

  console.log('✅ Miscellaneous data seeded successfully!');
}
