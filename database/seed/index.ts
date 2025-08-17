import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { resolve } from 'path';
import { seedLocations } from './locations';
import { seedIndustries } from './industries';
import { seedUsers } from './users';
import { seedCompanies } from './companies';
import { seedJobs } from './jobs';
import { seedApplications } from './applications';
import { seedMiscellaneous } from './misc';

const sqlite = new Database(resolve(__dirname, '../data.db'));
const db = drizzle(sqlite);

async function seed() {
  console.log('🌱 Starting comprehensive database seeding...');

  try {
    // Step 1: Seed locations (states, cities, districts)
    await seedLocations(db);

    // Step 2: Seed industries
    const industries = await seedIndustries(db);

    // Step 3: Seed users (includes job seekers and companies with profiles)
    const { companyUsers, jobSeekerUsers, adminUsers } = await seedUsers(db);

    // Step 4: Seed standalone companies (companies without user accounts)
    const companies = await seedCompanies(db, companyUsers.map(u => u.id));

    // Step 5: Seed jobs
    const jobs = await seedJobs(
      db, 
      companyUsers.map(u => u.id), 
      industries.map(i => i.id)
    );

    // Step 6: Seed job applications
    await seedApplications(
      db,
      jobs.map(j => j.id),
      jobSeekerUsers.map(u => u.id)
    );

    // Step 7: Seed miscellaneous data (saved jobs, search history, saved searches)
    await seedMiscellaneous(
      db,
      jobs.map(j => j.id),
      jobSeekerUsers.map(u => u.id)
    );

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Seeded data summary:`);
    console.log(`   • ${industries.length} industries`);
    console.log(`   • ${companyUsers.length} company users + ${companies.length} standalone companies`);
    console.log(`   • ${jobSeekerUsers.length} job seeker users`);
    console.log(`   • ${adminUsers.length} admin users`);
    console.log(`   • ${jobs.length} job postings`);
    console.log(`   • Multiple applications, saved jobs, and search data`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 