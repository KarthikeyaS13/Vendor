import express from 'express';
import { getDb } from '../config/db.js';

const router = express.Router();

router.post('/register/:token', async (req, res) => {
  const { token } = req.params;
  const formData = req.body;
  
  try {
    const db = await getDb();
    const invitation = await db.get('SELECT * FROM vendor_invitations WHERE token = ?', [token]);
    
    if (!invitation) return res.status(404).json({ error: 'Invalid token.' });
    if (invitation.status === 'Completed') return res.status(400).json({ error: 'Already registered.' });

    const appId = 'APP-' + Date.now();
    
    await db.run('BEGIN TRANSACTION');

    try {
      const appResult = await db.run(
        `INSERT INTO vendor_applications (invitation_id, application_number, status, submitted_at) VALUES (?, ?, ?, ?)`,
        [invitation.id, appId, 'SUBMITTED', new Date().toISOString()]
      );
      
      const applicationId = appResult.lastID;

      await db.run(
        `INSERT INTO vendor_company_profiles (application_id, legal_name, trade_name, entity_type, date_of_incorporation, website) VALUES (?, ?, ?, ?, ?, ?)`,
        [applicationId, formData.vendorLegalName || '', formData.vendorName || '', formData.entityType || 'Private Limited', formData.incorporationDate || '2000-01-01', formData.website || '']
      );

      await db.run(
        `INSERT INTO vendor_business_profiles (application_id, industry_category, primary_products, service_regions, gst_number, pan_number) VALUES (?, ?, ?, ?, ?, ?)`,
        [applicationId, formData.vendorCategory || 'IT', formData.primaryProducts || '', formData.serviceRegions || '', formData.gstin || '', formData.pan || '']
      );

      await db.run(
        `INSERT INTO vendor_financial_profiles (application_id, bank_name, account_name, account_number, ifsc_code) VALUES (?, ?, ?, ?, ?)`,
        [applicationId, formData.bankName || 'Test Bank', formData.vendorLegalName || 'Account Name', formData.accountNumber || '', formData.ifsc || '']
      );

      await db.run(
        `UPDATE vendor_invitations SET status = 'Completed', submitted_at = ? WHERE id = ?`,
        [new Date().toISOString(), invitation.id]
      );

      await db.run('COMMIT');
      res.json({ message: 'Registration successful', applicationId: appId });
    } catch (txErr) {
      await db.run('ROLLBACK');
      throw txErr;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

export default router;
