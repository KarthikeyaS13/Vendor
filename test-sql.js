import { getDb } from './server/src/config/db.js';

async function test() {
  try {
    const db = await getDb();
    console.log("DB connected");
    const result = await db.all(`
      SELECT 
        i.id as invitation_id,
        i.invitationId,
        i.email,
        i.mobile,
        i.status as invitation_status,
        i.created_at as invitation_date,
        i.expires_at,
        i.contactPerson,
        COALESCE(cp.legal_name, i.companyName) as company_name,
        a.id as application_id,
        a.application_number,
        a.status as application_status,
        a.submitted_at,
        bp.industry_category,
        fp.currency
      FROM vendor_invitations i
      LEFT JOIN vendor_applications a ON i.id = a.invitation_id
      LEFT JOIN vendor_company_profiles cp ON a.id = cp.application_id
      LEFT JOIN vendor_business_profiles bp ON a.id = bp.application_id
      LEFT JOIN vendor_financial_profiles fp ON a.id = fp.application_id
      ORDER BY i.created_at DESC
    `);
    console.log("Success:", result.length);
  } catch (e) {
    console.error("SQL Error:", e.message);
  }
}

test();
