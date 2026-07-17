import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb } from './src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
  try {
    const db = await getDb();
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // SQLite node driver exec supports multiple statements
    await db.exec(schema);
    console.log('Database initialized successfully with SQLite schema.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initDb();
