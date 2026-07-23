import { getDb } from './src/config/db.js';

async function checkDocs() {
  try {
    const db = await getDb();
    const docs = await db.all('SELECT id, application_id, file_path FROM vendor_documents ORDER BY id DESC LIMIT 5');
    console.log('Recent Documents:', docs);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkDocs();
