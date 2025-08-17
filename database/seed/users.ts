import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users, jobSeekerProfiles, companyProfiles } from '../schema/users';

export async function seedUsers(db: ReturnType<typeof drizzle>) {
  console.log('👥 Seeding users...');

  // Insert company users
  const companyUsers = await db.insert(users).values([
    {
      email: 'tech@acme.com',
      name: 'Acme Tech',
      password: '$2b$10$example.hash', // In real app, properly hash passwords
      role: 'company',
    },
    {
      email: 'hr@startup.io',
      name: 'Startup.io',
      password: '$2b$10$example.hash',
      role: 'company',
    },
    {
      email: 'jobs@techgiant.com',
      name: 'TechGiant Corp',
      password: '$2b$10$example.hash',
      role: 'company',
    },
    {
      email: 'careers@financeplus.com',
      name: 'FinancePlus',
      password: '$2b$10$example.hash',
      role: 'company',
    },
    {
      email: 'hiring@healthtech.com',
      name: 'HealthTech Solutions',
      password: '$2b$10$example.hash',
      role: 'company',
    },
  ]).returning();

  // Insert job seeker users
  const jobSeekerUsers = await db.insert(users).values([
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
    {
      email: 'mike.johnson@example.com',
      name: 'Mike Johnson',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
    {
      email: 'sarah.wilson@example.com',
      name: 'Sarah Wilson',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
    {
      email: 'david.brown@example.com',
      name: 'David Brown',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
    {
      email: 'lisa.garcia@example.com',
      name: 'Lisa Garcia',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
    {
      email: 'alex.chen@example.com',
      name: 'Alex Chen',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
    {
      email: 'emily.davis@example.com',
      name: 'Emily Davis',
      password: '$2b$10$example.hash',
      role: 'jobseeker',
    },
  ]).returning();

  // Insert admin user
  const adminUsers = await db.insert(users).values([
    {
      email: 'admin@vibejobs.com',
      name: 'Admin User',
      password: '$2b$10$example.hash',
      role: 'admin',
    },
  ]).returning();

  // Insert company profiles
  await db.insert(companyProfiles).values([
    {
      userId: companyUsers[0].id,
      companyName: 'Acme Technologies Inc.',
      description: 'Leading provider of innovative software solutions for enterprise clients. We specialize in cloud computing, AI, and digital transformation.',
      industry: 'Technology',
      size: 'medium',
      location: 'San Francisco, CA',
      website: 'https://www.acmetech.com',
      foundedYear: 2015,
      employeeCount: 250,
    },
    {
      userId: companyUsers[1].id,
      companyName: 'Startup.io',
      description: 'Fast-growing startup focused on revolutionizing the way people work remotely. We build collaboration tools for distributed teams.',
      industry: 'Technology',
      size: 'startup',
      location: 'Austin, TX',
      website: 'https://www.startup.io',
      foundedYear: 2020,
      employeeCount: 45,
    },
    {
      userId: companyUsers[2].id,
      companyName: 'TechGiant Corporation',
      description: 'Global technology leader with a diverse portfolio of products and services spanning cloud, AI, hardware, and enterprise software.',
      industry: 'Technology',
      size: 'enterprise',
      location: 'Seattle, WA',
      website: 'https://www.techgiant.com',
      foundedYear: 1995,
      employeeCount: 150000,
    },
    {
      userId: companyUsers[3].id,
      companyName: 'FinancePlus',
      description: 'Modern financial services company offering digital banking, investment management, and fintech solutions.',
      industry: 'Finance',
      size: 'large',
      location: 'New York, NY',
      website: 'https://www.financeplus.com',
      foundedYear: 2010,
      employeeCount: 2500,
    },
    {
      userId: companyUsers[4].id,
      companyName: 'HealthTech Solutions',
      description: 'Healthcare technology company developing innovative solutions for hospitals, clinics, and patients.',
      industry: 'Healthcare',
      size: 'medium',
      location: 'Boston, MA',
      website: 'https://www.healthtechsolutions.com',
      foundedYear: 2018,
      employeeCount: 180,
    },
  ]);

  // Insert job seeker profiles
  await db.insert(jobSeekerProfiles).values([
    {
      userId: jobSeekerUsers[0].id,
      bio: 'Experienced full-stack developer with a passion for creating scalable web applications. Proficient in React, Node.js, and cloud technologies.',
      skills: JSON.stringify(['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker']),
      experience: 'senior',
      education: 'bachelor',
      location: 'San Francisco, CA',
    },
    {
      userId: jobSeekerUsers[1].id,
      bio: 'Product manager with 5+ years of experience leading cross-functional teams to deliver innovative digital products.',
      skills: JSON.stringify(['Product Management', 'Agile', 'User Research', 'Data Analysis', 'Figma', 'Jira']),
      experience: 'mid',
      education: 'master',
      location: 'New York, NY',
    },
    {
      userId: jobSeekerUsers[2].id,
      bio: 'DevOps engineer specializing in cloud infrastructure and automation. Expert in containerization and CI/CD pipelines.',
      skills: JSON.stringify(['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Python', 'Bash']),
      experience: 'senior',
      education: 'bachelor',
      location: 'Austin, TX',
    },
    {
      userId: jobSeekerUsers[3].id,
      bio: 'UX/UI designer focused on creating user-centered designs that drive engagement and conversion.',
      skills: JSON.stringify(['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing']),
      experience: 'mid',
      education: 'bachelor',
      location: 'Los Angeles, CA',
    },
    {
      userId: jobSeekerUsers[4].id,
      bio: 'Data scientist with expertise in machine learning, statistical analysis, and data visualization.',
      skills: JSON.stringify(['Python', 'R', 'SQL', 'TensorFlow', 'Pandas', 'Tableau', 'Machine Learning']),
      experience: 'senior',
      education: 'phd',
      location: 'Seattle, WA',
    },
    {
      userId: jobSeekerUsers[5].id,
      bio: 'Marketing specialist with experience in digital marketing, content creation, and social media management.',
      skills: JSON.stringify(['Digital Marketing', 'SEO', 'Google Analytics', 'Social Media', 'Content Writing']),
      experience: 'junior',
      education: 'bachelor',
      location: 'Chicago, IL',
    },
    {
      userId: jobSeekerUsers[6].id,
      bio: 'Software engineer passionate about backend development and system architecture.',
      skills: JSON.stringify(['Java', 'Spring Boot', 'Microservices', 'Redis', 'MySQL', 'Kafka']),
      experience: 'mid',
      education: 'bachelor',
      location: 'Dallas, TX',
    },
    {
      userId: jobSeekerUsers[7].id,
      bio: 'Recent computer science graduate eager to start career in software development.',
      skills: JSON.stringify(['Python', 'Java', 'React', 'Git', 'SQL', 'Algorithms']),
      experience: 'entry',
      education: 'bachelor',
      location: 'Atlanta, GA',
    },
  ]);

  console.log('✅ Users seeded successfully!');
  return { companyUsers, jobSeekerUsers, adminUsers };
}
