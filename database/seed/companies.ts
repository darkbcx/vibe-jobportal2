import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { companies, companyReviews } from '../schema/companies';

export async function seedCompanies(db: ReturnType<typeof drizzle>, companyUserIds: string[]) {
  console.log('🏢 Seeding companies...');

  // Insert companies (separate from users, for companies that don't have user accounts)
  const companiesData = await db.insert(companies).values([
    {
      name: 'Meta Platforms',
      description: 'Global technology company that builds technologies that help people connect, find communities, and grow businesses.',
      industry: 'Technology',
      size: 'enterprise',
      location: 'Menlo Park, CA',
      website: 'https://www.meta.com',
      foundedYear: 2004,
      employeeCount: 77800,
    },
    {
      name: 'Google',
      description: 'Multinational technology company that specializes in internet-related services and products.',
      industry: 'Technology',
      size: 'enterprise',
      location: 'Mountain View, CA',
      website: 'https://www.google.com',
      foundedYear: 1998,
      employeeCount: 182502,
    },
    {
      name: 'Amazon',
      description: 'Multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.',
      industry: 'Technology',
      size: 'enterprise',
      location: 'Seattle, WA',
      website: 'https://www.amazon.com',
      foundedYear: 1994,
      employeeCount: 1541000,
    },
    {
      name: 'Apple Inc.',
      description: 'Technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
      industry: 'Technology',
      size: 'enterprise',
      location: 'Cupertino, CA',
      website: 'https://www.apple.com',
      foundedYear: 1976,
      employeeCount: 164000,
    },
    {
      name: 'Microsoft Corporation',
      description: 'Multinational technology corporation that produces computer software, consumer electronics, and personal computers.',
      industry: 'Technology',
      size: 'enterprise',
      location: 'Redmond, WA',
      website: 'https://www.microsoft.com',
      foundedYear: 1975,
      employeeCount: 221000,
    },
    {
      name: 'Goldman Sachs',
      description: 'Leading global investment banking, securities and investment management firm.',
      industry: 'Finance',
      size: 'enterprise',
      location: 'New York, NY',
      website: 'https://www.goldmansachs.com',
      foundedYear: 1869,
      employeeCount: 45000,
    },
    {
      name: 'Netflix',
      description: 'Streaming entertainment service with over 230 million paid memberships in more than 190 countries.',
      industry: 'Media & Entertainment',
      size: 'large',
      location: 'Los Gatos, CA',
      website: 'https://www.netflix.com',
      foundedYear: 1997,
      employeeCount: 12800,
    },
    {
      name: 'Spotify',
      description: 'Digital music, podcast, and video service that gives access to millions of songs and other content.',
      industry: 'Media & Entertainment',
      size: 'large',
      location: 'Stockholm, Sweden',
      website: 'https://www.spotify.com',
      foundedYear: 2006,
      employeeCount: 9800,
    },
    {
      name: 'Airbnb',
      description: 'Online marketplace for short- and long-term homestays and experiences.',
      industry: 'Travel & Hospitality',
      size: 'large',
      location: 'San Francisco, CA',
      website: 'https://www.airbnb.com',
      foundedYear: 2008,
      employeeCount: 6800,
    },
    {
      name: 'Uber Technologies',
      description: 'Technology platform where those looking to move can connect with those looking to earn.',
      industry: 'Transportation & Logistics',
      size: 'large',
      location: 'San Francisco, CA',
      website: 'https://www.uber.com',
      foundedYear: 2009,
      employeeCount: 32200,
    },
  ]).returning();

  // Insert company reviews
  const reviewsData = [
    // Meta reviews
    {
      companyId: companiesData[0].id,
      reviewerId: companyUserIds[0] || 'reviewer-1',
      rating: 4,
      title: 'Great place for innovation',
      content: 'Amazing opportunities to work on cutting-edge technology. The company culture promotes innovation and creativity.',
      pros: JSON.stringify(['Innovative projects', 'Great benefits', 'Smart colleagues', 'Good work-life balance']),
      cons: JSON.stringify(['High pressure environment', 'Fast-paced changes']),
    },
    {
      companyId: companiesData[0].id,
      reviewerId: companyUserIds[1] || 'reviewer-2',
      rating: 5,
      title: 'Excellent growth opportunities',
      content: 'The mentorship and learning opportunities here are unparalleled. Great place to accelerate your career.',
      pros: JSON.stringify(['Career growth', 'Learning opportunities', 'Diverse teams', 'Modern office']),
      cons: JSON.stringify(['Long hours sometimes', 'Competitive environment']),
    },
    // Google reviews
    {
      companyId: companiesData[1].id,
      reviewerId: companyUserIds[0] || 'reviewer-3',
      rating: 5,
      title: 'Dream company to work for',
      content: 'Everything you hear about Google is true. Amazing perks, brilliant people, and meaningful work.',
      pros: JSON.stringify(['Amazing perks', 'Smart people', 'Impactful work', 'Great campus']),
      cons: JSON.stringify(['Can be bureaucratic', 'High expectations']),
    },
    // Amazon reviews
    {
      companyId: companiesData[2].id,
      reviewerId: companyUserIds[1] || 'reviewer-4',
      rating: 3,
      title: 'Good learning experience but intense',
      content: 'You will learn a lot and grow fast, but the work culture can be very demanding.',
      pros: JSON.stringify(['Fast growth', 'Learning opportunities', 'Good compensation', 'Global impact']),
      cons: JSON.stringify(['Work-life balance', 'High pressure', 'Long hours']),
    },
    // Apple reviews
    {
      companyId: companiesData[3].id,
      reviewerId: companyUserIds[0] || 'reviewer-5',
      rating: 4,
      title: 'Premium company culture',
      content: 'Working at Apple feels special. The attention to detail and quality is evident in everything we do.',
      pros: JSON.stringify(['Premium brand', 'Quality focus', 'Great benefits', 'Innovation']),
      cons: JSON.stringify(['Secretive culture', 'High standards pressure']),
    },
    // Microsoft reviews
    {
      companyId: companiesData[4].id,
      reviewerId: companyUserIds[1] || 'reviewer-6',
      rating: 4,
      title: 'Great work-life balance',
      content: 'Microsoft has really improved its culture over the years. Great place for long-term career growth.',
      pros: JSON.stringify(['Work-life balance', 'Inclusive culture', 'Good benefits', 'Stable company']),
      cons: JSON.stringify(['Large company bureaucracy', 'Slow decision making']),
    },
    // Netflix reviews
    {
      companyId: companiesData[6].id,
      reviewerId: companyUserIds[0] || 'reviewer-7',
      rating: 4,
      title: 'Freedom and responsibility culture',
      content: 'Netflix gives you a lot of autonomy to do your best work. The culture of freedom and responsibility is real.',
      pros: JSON.stringify(['Autonomy', 'High performance culture', 'Good compensation', 'Flexible work']),
      cons: JSON.stringify(['High performance pressure', 'Can be stressful']),
    },
    // Spotify reviews
    {
      companyId: companiesData[7].id,
      reviewerId: companyUserIds[1] || 'reviewer-8',
      rating: 5,
      title: 'Music lover paradise',
      content: 'If you love music and technology, this is the perfect place. Great culture and passionate people.',
      pros: JSON.stringify(['Music-focused culture', 'Creative environment', 'Passionate team', 'Good perks']),
      cons: JSON.stringify(['Competitive industry', 'Fast-paced environment']),
    },
  ];

  await db.insert(companyReviews).values(reviewsData);

  console.log('✅ Companies seeded successfully!');
  return companiesData;
}
