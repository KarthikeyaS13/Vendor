import { getDb } from './src/config/db.js';

async function deleteGopal() {
  try {
    const db = await getDb();
    const result = await db.run("DELETE FROM vendor_invitations WHERE email = 'gopalkrishna1200@gmail.com'");
    console.log('Delete result:', result);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteGopal();
