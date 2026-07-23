import { getDb } from './src/config/db.js';

async function clearDatabase() {
  try {
    const db = await getDb();
    
    console.log('Fetching all tables...');
    
    // Get all tables in the public schema
    const tables = await db.all(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
    );
    
    if (!tables || tables.length === 0) {
      console.log('No tables found to clear.');
      process.exit(0);
    }
    
    const tableNames = tables
      .map(t => t.tablename)
      .filter(name => name !== 'spatial_ref_sys');
      
    if (tableNames.length > 0) {
      console.log('Clearing tables: ' + tableNames.join(', '));
      const truncateQuery = 'TRUNCATE TABLE "' + tableNames.join('", "') + '" CASCADE;';
      await db.run(truncateQuery);
      console.log('✅ Database completely cleared (all tables truncated)!');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error clearing database:', err);
    process.exit(1);
  }
}

clearDatabase();
