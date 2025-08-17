# Location Feature

## Location Hierarchies and Structure

### Geographic Hierarchy
- A state consists of cities/municipalities  
- A city consists of districts/neighborhoods/areas
- Each level maintains parent-child relationships for efficient querying

### Location Data Relationships
- **State Level**: Top-level administrative divisions (states, provinces, regions)
- **City Level**: Urban areas and municipalities within states
- **District Level**: Neighborhoods, areas, or sub-districts within cities
- Hierarchical structure enables cascading location searches and filtering

## Data Storage and Schema

### Location Tables Structure
- **States** stored in `state` table with fields: `id`, `code`, `name`, `created_at`, `updated_at`
- **Cities** stored in `city` table with fields: `id`, `state_id`, `name`, `population`, `latitude`, `longitude`, `created_at`, `updated_at`
- **Districts** stored in `district` table with fields: `id`, `city_id`, `name`, `postal_code`, `created_at`, `updated_at`

### Hierarchical ID System
- ID fields use composite structure to reflect location hierarchy
- **State ID**: 2-digit state code (e.g., `CA`, `NY`, `TX`)
- **City ID**: State ID + city code (e.g., `CA.SF`, `NY.NYC`, `TX.AUS`)
- **District ID**: City ID + district code (e.g., `CA.SF.SOMA`, `NY.NYC.MAN`, `TX.AUS.DT`)
- Composite IDs enable efficient querying and maintain referential integrity