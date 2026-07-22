import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkSchema() {
  const db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  const columns = await db.all("PRAGMA table_info(purchase_invoices)");
  console.log('Columns in purchase_invoices:', columns.map(c => c.name));
  
  const vendorCols = await db.all("PRAGMA table_info(purchase_orders)");
  console.log('Columns in purchase_orders:', vendorCols.map(c => c.name));
}

checkSchema().catch(console.error);
