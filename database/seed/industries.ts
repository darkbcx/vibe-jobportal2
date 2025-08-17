import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { industries } from '../schema/industries';

export async function seedIndustries(db: ReturnType<typeof drizzle>) {
  console.log('🏭 Seeding industries...');

  const industriesData = [
    { 
      name: 'Technology', 
      description: 'Software development, hardware, cloud services, cybersecurity, AI/ML, and tech consulting' 
    },
    { 
      name: 'Finance', 
      description: 'Banking, investment services, insurance, fintech, accounting, and financial consulting' 
    },
    { 
      name: 'Healthcare', 
      description: 'Medical services, hospitals, pharmaceuticals, biotech, medical devices, and health technology' 
    },
    { 
      name: 'Education', 
      description: 'Schools, universities, online learning platforms, educational technology, and training services' 
    },
    { 
      name: 'Retail', 
      description: 'E-commerce, brick-and-mortar stores, consumer goods, fashion, and retail technology' 
    },
    { 
      name: 'Manufacturing', 
      description: 'Production of goods, automotive, aerospace, electronics, and industrial equipment' 
    },
    { 
      name: 'Real Estate', 
      description: 'Property development, real estate brokerage, property management, and construction' 
    },
    { 
      name: 'Marketing & Advertising', 
      description: 'Digital marketing, advertising agencies, public relations, content creation, and brand management' 
    },
    { 
      name: 'Consulting', 
      description: 'Management consulting, strategy consulting, IT consulting, and specialized advisory services' 
    },
    { 
      name: 'Media & Entertainment', 
      description: 'Television, film, music, gaming, publishing, streaming services, and digital content' 
    },
    { 
      name: 'Transportation & Logistics', 
      description: 'Shipping, freight, supply chain management, ride-sharing, and delivery services' 
    },
    { 
      name: 'Energy & Utilities', 
      description: 'Oil & gas, renewable energy, electric utilities, solar, wind, and energy technology' 
    },
    { 
      name: 'Government & Public Sector', 
      description: 'Federal, state, and local government agencies, public services, and defense contractors' 
    },
    { 
      name: 'Non-Profit', 
      description: 'Charitable organizations, foundations, NGOs, advocacy groups, and social impact organizations' 
    },
    { 
      name: 'Legal', 
      description: 'Law firms, corporate legal departments, legal technology, and compliance services' 
    },
    { 
      name: 'Food & Beverage', 
      description: 'Restaurants, food production, beverage companies, catering, and food technology' 
    },
    { 
      name: 'Travel & Hospitality', 
      description: 'Hotels, airlines, travel agencies, tourism, cruise lines, and hospitality services' 
    },
    { 
      name: 'Sports & Recreation', 
      description: 'Professional sports, fitness centers, outdoor recreation, sports equipment, and gaming' 
    },
    { 
      name: 'Agriculture', 
      description: 'Farming, agricultural technology, food production, livestock, and agribusiness' 
    },
    { 
      name: 'Telecommunications', 
      description: 'Mobile carriers, internet service providers, networking equipment, and communication technology' 
    }
  ];

  const insertedIndustries = await db.insert(industries).values(industriesData).returning();

  console.log('✅ Industries seeded successfully!');
  return insertedIndustries;
}
