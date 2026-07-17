import express from 'express';
import { getDb } from '../config/db.js';

const router = express.Router();

// GET /api/applications
// Fetch all invitations along with their application status and company details
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const applications = await db.all(`
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
    
    // Calculate completion %
    // Basic logic:
    // Opened = 14%
    // Completed/Submitted = 100%
    // Otherwise 0%
    const formattedApps = applications.map(app => {
      let completion = 0;
      let status = app.invitation_status;
      
      if (app.application_status) {
        status = app.application_status;
        completion = 100; // Simplified for now since we don't track step progress in DB
      } else if (app.invitation_status === 'Opened') {
        completion = 14;
      }
      
      return {
        ...app,
        display_status: status,
        completion_percentage: completion
      };
    });

    res.json(formattedApps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applications.', details: err.message });
  }
});

// GET /api/applications/:id
// Get detailed application data by invitation_id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await getDb();
    
    const invitation = await db.get('SELECT * FROM vendor_invitations WHERE id = ?', [id]);
    if (!invitation) return res.status(404).json({ error: 'Not found' });
    
    let application = null;
    let company = null;
    let business = null;
    let financial = null;
    let documents = [];

    application = await db.get('SELECT * FROM vendor_applications WHERE invitation_id = ?', [id]);
    
    if (application) {
      company = await db.get('SELECT * FROM vendor_company_profiles WHERE application_id = ?', [application.id]);
      business = await db.get('SELECT * FROM vendor_business_profiles WHERE application_id = ?', [application.id]);
      financial = await db.get('SELECT * FROM vendor_financial_profiles WHERE application_id = ?', [application.id]);
      documents = await db.all('SELECT * FROM vendor_documents WHERE application_id = ?', [application.id]);
    }

    res.json({
      invitation,
      application,
      company,
      business,
      financial,
      documents
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch application details.' });
  }
});

// PUT /api/applications/:id/status
// Update application status (e.g., Approve, Reject)
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'APPROVED' or 'REJECTED'

  try {
    const db = await getDb();
    
    // First, find the application id associated with this invitation_id
    const application = await db.get('SELECT id FROM vendor_applications WHERE invitation_id = ?', [id]);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found for this invitation.' });
    }

    await db.run(
      'UPDATE vendor_applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, application.id]
    );

    // Phase 2: If APPROVED, create a vendor master record
    if (status === 'APPROVED') {
      // Check if vendor already exists to prevent duplicates
      const existingVendor = await db.get('SELECT id FROM vendors WHERE application_id = ?', [application.id]);
      
      if (!existingVendor) {
        // Generate Vendor Code (e.g. VEN001)
        const lastVendor = await db.get('SELECT vendor_code FROM vendors ORDER BY id DESC LIMIT 1');
        let nextNumber = 1;
        if (lastVendor && lastVendor.vendor_code.startsWith('VEN')) {
          const lastNumber = parseInt(lastVendor.vendor_code.replace('VEN', ''), 10);
          if (!isNaN(lastNumber)) {
            nextNumber = lastNumber + 1;
          }
        }
        const vendorCode = `VEN${nextNumber.toString().padStart(3, '0')}`;
        
        // Fetch necessary details to populate the vendor master
        const company = await db.get('SELECT legal_name FROM vendor_company_profiles WHERE application_id = ?', [application.id]);
        const business = await db.get('SELECT industry_category, gst_number, pan_number FROM vendor_business_profiles WHERE application_id = ?', [application.id]);
        const contact = await db.get('SELECT first_name, email, phone FROM vendor_contacts WHERE application_id = ? AND is_primary = 1', [application.id]);
        const invitation = await db.get('SELECT contactPerson, email, mobile FROM vendor_invitations WHERE id = ?', [id]);
        
        await db.run(`
          INSERT INTO vendors (
            vendor_code, application_id, company_name, contact_person, email, mobile, 
            industry, gst_number, pan_number, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          vendorCode,
          application.id,
          company?.legal_name || 'Unknown',
          contact?.first_name || invitation?.contactPerson || 'Unknown',
          contact?.email || invitation?.email || 'Unknown',
          contact?.phone || invitation?.mobile || '',
          business?.industry_category || '',
          business?.gst_number || '',
          business?.pan_number || '',
          'Active'
        ]);

        // Create an audit log for Vendor Creation
        await db.run(`
          INSERT INTO audit_logs (action, entity_type, entity_id, new_values)
          VALUES (?, ?, ?, ?)
        `, [
          'VENDOR_CREATED',
          'VENDOR',
          application.id, // using application_id as a reference point for now, could use the new vendor.id
          JSON.stringify({ status: 'Active', vendor_code: vendorCode })
        ]);
      }
    }

    res.json({ success: true, message: `Application status updated to ${status}` });
  } catch (err) {
    console.error('Error updating application status:', err);
    res.status(500).json({ error: 'Failed to update application status.' });
  }
});

export default router;
