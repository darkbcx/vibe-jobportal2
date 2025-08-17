import { drizzle } from 'drizzle-orm/better-sqlite3';
import { states, cities, districts } from '../schema/locations';

export async function seedLocations(db: ReturnType<typeof drizzle>) {
  console.log('🗺️  Seeding locations...');

  // Insert sample states
    const statesData = [
      { id: 'CA', code: 'CA', name: 'California' },
      { id: 'NY', code: 'NY', name: 'New York' },
      { id: 'TX', code: 'TX', name: 'Texas' },
      { id: 'FL', code: 'FL', name: 'Florida' },
      { id: 'WA', code: 'WA', name: 'Washington' },
      { id: 'IL', code: 'IL', name: 'Illinois' },
      { id: 'OH', code: 'OH', name: 'Ohio' },
      { id: 'GA', code: 'GA', name: 'Georgia' },
      { id: 'NC', code: 'NC', name: 'North Carolina' },
      { id: 'MI', code: 'MI', name: 'Michigan' },
    ];

    console.log('Inserting states...');
    await db.insert(states).values(statesData);
    console.log('States inserted successfully');

    // Insert sample cities
    const citiesData = [
      // California cities
      { 
        id: 'CA.SF', 
        stateId: 'CA', 
        name: 'San Francisco',
        population: 873965,
        latitude: 37.7749,
        longitude: -122.4194
      },
      { 
        id: 'CA.LA', 
        stateId: 'CA', 
        name: 'Los Angeles',
        population: 3898747,
        latitude: 34.0522,
        longitude: -118.2437
      },
      { 
        id: 'CA.SD', 
        stateId: 'CA', 
        name: 'San Diego',
        population: 1386932,
        latitude: 32.7157,
        longitude: -117.1611
      },
      { 
        id: 'CA.SJ', 
        stateId: 'CA', 
        name: 'San Jose',
        population: 1013240,
        latitude: 37.3382,
        longitude: -121.8863
      },
      // New York cities
      { 
        id: 'NY.NYC', 
        stateId: 'NY', 
        name: 'New York City',
        population: 8336817,
        latitude: 40.7128,
        longitude: -74.0060
      },
      { 
        id: 'NY.BUF', 
        stateId: 'NY', 
        name: 'Buffalo',
        population: 258612,
        latitude: 42.8864,
        longitude: -78.8784
      },
      // Texas cities
      { 
        id: 'TX.AUS', 
        stateId: 'TX', 
        name: 'Austin',
        population: 964254,
        latitude: 30.2672,
        longitude: -97.7431
      },
      { 
        id: 'TX.HOU', 
        stateId: 'TX', 
        name: 'Houston',
        population: 2320268,
        latitude: 29.7604,
        longitude: -95.3698
      },
      { 
        id: 'TX.DAL', 
        stateId: 'TX', 
        name: 'Dallas',
        population: 1343573,
        latitude: 32.7767,
        longitude: -96.7970
      },
      // Florida cities
      { 
        id: 'FL.MIA', 
        stateId: 'FL', 
        name: 'Miami',
        population: 442241,
        latitude: 25.7617,
        longitude: -80.1918
      },
      { 
        id: 'FL.TAM', 
        stateId: 'FL', 
        name: 'Tampa',
        population: 384959,
        latitude: 27.9506,
        longitude: -82.4572
      },
      // Washington cities
      { 
        id: 'WA.SEA', 
        stateId: 'WA', 
        name: 'Seattle',
        population: 749256,
        latitude: 47.6062,
        longitude: -122.3321
      },
      // Illinois cities
      { 
        id: 'IL.CHI', 
        stateId: 'IL', 
        name: 'Chicago',
        population: 2693976,
        latitude: 41.8781,
        longitude: -87.6298
      },
      // Georgia cities
      { 
        id: 'GA.ATL', 
        stateId: 'GA', 
        name: 'Atlanta',
        population: 498715,
        latitude: 33.7490,
        longitude: -84.3880
      }
    ];

    console.log('Inserting cities...');
    await db.insert(cities).values(citiesData);
    console.log('Cities inserted successfully');

    // Insert sample districts
    const districtsData = [
      // San Francisco districts
      { id: 'CA.SF.SOMA', cityId: 'CA.SF', name: 'South of Market', postalCode: '94103' },
      { id: 'CA.SF.FIN', cityId: 'CA.SF', name: 'Financial District', postalCode: '94104' },
      { id: 'CA.SF.MISSION', cityId: 'CA.SF', name: 'Mission District', postalCode: '94110' },
      { id: 'CA.SF.SUNSET', cityId: 'CA.SF', name: 'Sunset District', postalCode: '94122' },
      
      // Los Angeles districts
      { id: 'CA.LA.HOLLYWOOD', cityId: 'CA.LA', name: 'Hollywood', postalCode: '90028' },
      { id: 'CA.LA.BEVERLY', cityId: 'CA.LA', name: 'Beverly Hills', postalCode: '90210' },
      { id: 'CA.LA.SANTA', cityId: 'CA.LA', name: 'Santa Monica', postalCode: '90401' },
      
      // San Jose districts
      { id: 'CA.SJ.DT', cityId: 'CA.SJ', name: 'Downtown', postalCode: '95113' },
      { id: 'CA.SJ.WILLOW', cityId: 'CA.SJ', name: 'Willow Glen', postalCode: '95125' },
      
      // New York City districts
      { id: 'NY.NYC.MAN', cityId: 'NY.NYC', name: 'Manhattan', postalCode: '10001' },
      { id: 'NY.NYC.BRK', cityId: 'NY.NYC', name: 'Brooklyn', postalCode: '11201' },
      { id: 'NY.NYC.QUEENS', cityId: 'NY.NYC', name: 'Queens', postalCode: '11101' },
      { id: 'NY.NYC.BRONX', cityId: 'NY.NYC', name: 'Bronx', postalCode: '10451' },
      
      // Austin districts
      { id: 'TX.AUS.DT', cityId: 'TX.AUS', name: 'Downtown', postalCode: '78701' },
      { id: 'TX.AUS.SOUTH', cityId: 'TX.AUS', name: 'South Austin', postalCode: '78704' },
      { id: 'TX.AUS.EAST', cityId: 'TX.AUS', name: 'East Austin', postalCode: '78702' },
      
      // Houston districts
      { id: 'TX.HOU.DT', cityId: 'TX.HOU', name: 'Downtown', postalCode: '77002' },
      { id: 'TX.HOU.GALLERIA', cityId: 'TX.HOU', name: 'Galleria', postalCode: '77056' },
      
      // Dallas districts
      { id: 'TX.DAL.DT', cityId: 'TX.DAL', name: 'Downtown', postalCode: '75201' },
      { id: 'TX.DAL.UPTOWN', cityId: 'TX.DAL', name: 'Uptown', postalCode: '75204' },
      
      // Miami districts
      { id: 'FL.MIA.DT', cityId: 'FL.MIA', name: 'Downtown', postalCode: '33131' },
      { id: 'FL.MIA.BEACH', cityId: 'FL.MIA', name: 'South Beach', postalCode: '33139' },
      
      // Seattle districts
      { id: 'WA.SEA.DT', cityId: 'WA.SEA', name: 'Downtown', postalCode: '98101' },
      { id: 'WA.SEA.CAP', cityId: 'WA.SEA', name: 'Capitol Hill', postalCode: '98102' },
      
      // Chicago districts
      { id: 'IL.CHI.LOOP', cityId: 'IL.CHI', name: 'The Loop', postalCode: '60601' },
      { id: 'IL.CHI.LINCOLN', cityId: 'IL.CHI', name: 'Lincoln Park', postalCode: '60614' },
      
      // Atlanta districts
      { id: 'GA.ATL.DT', cityId: 'GA.ATL', name: 'Downtown', postalCode: '30303' },
      { id: 'GA.ATL.MIDTOWN', cityId: 'GA.ATL', name: 'Midtown', postalCode: '30309' },
    ];

    console.log('Inserting districts...');
    await db.insert(districts).values(districtsData);
    console.log('Districts inserted successfully');

    console.log('✅ Locations seeded successfully!');
}
