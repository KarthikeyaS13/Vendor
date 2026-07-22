import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance = null;

export const getDb = async () => {
  if (dbInstance) {
    return dbInstance;
  }
  
  dbInstance = await open({
    filename: path.join(__dirname, '../../database/database.sqlite'),
    driver: sqlite3.Database
  });
  
  // Run migrations
  try {
    await dbInstance.run('ALTER TABLE purchase_invoices ADD COLUMN due_date DATE');
  } catch (e) {
    // Column might already exist, ignore
  }
  
  try {
    await dbInstance.run('ALTER TABLE purchase_invoices ADD COLUMN bank_name TEXT');
  } catch (e) {
    // Column might already exist, ignore
  }

  try {
    await dbInstance.run('ALTER TABLE purchase_invoices ADD COLUMN remarks TEXT');
  } catch (e) {
    // Column might already exist, ignore
  }
  
  return dbInstance;
};

// Export a mock pool interface to mimic the existing behavior for simple queries
// if any exist, but it's better to refactor to use getDb().
export default {
  query: async (sql, params) => {
    const db = await getDb();
    return db.all(sql, params);
  },
  execute: async (sql, params) => {
    const db = await getDb();
    const result = await db.run(sql, params);
    return [result]; // mimic mysql2 [results, fields] return
  }
};
