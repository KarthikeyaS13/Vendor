import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { getDb } from '../config/db.js';

const router = express.Router();

function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

// POST /api/invitations
router.post('/', async (req, res) => {
  const { companyName, email, mobile } = req.body;
  const contactPerson = req.body.contactPerson || 'N/A';
  if (!companyName || !email) {
    return res.status(400).json({ error: 'Company Name and Email are required.' });
  }

  const token = uuidv4();
  const invitationId = 'INV-' + Date.now();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const db = await getDb();
    await db.run(
      `INSERT INTO vendor_invitations 
      (invitationId, companyName, contactPerson, email, mobile, token, status, expires_at) 
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?)`,
      [invitationId, companyName, contactPerson, email, mobile || null, token, expiresAt]
    );

    const registrationUrl = `http://localhost:5173/register/${token}`;

    console.log(`[Email System] Sending invitation email to ${email}. Link: ${registrationUrl}`);
    
    let previewUrl = null;
    
    console.log("SMTP_USER =", process.env.SMTP_USER);
    console.log("SMTP_PASS exists =", !!process.env.SMTP_PASS);

    const transporter = getTransporter();

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('[Email System] WARNING: SMTP credentials are not configured. Invitation created but email was not sent.');
    } else if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"${process.env.FROM_NAME}" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Vendor Registration Invitation",
          text: `You have been invited to register as a vendor. Please complete your registration here: ${registrationUrl}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #4f46e5;">Vendor Registration Invitation</h2>
              <p>Dear ${companyName},</p>
              <p>You have been invited to register as a vendor on the Nexus Vendor Portal.</p>
              <p>Please click the button below to complete your application:</p>
              <div style="margin: 30px 0;">
                <a href="${registrationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Complete Registration</a>
              </div>
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p><a href="${registrationUrl}">${registrationUrl}</a></p>
              <p>This invitation link will expire in 7 days.</p>
              <p>Best regards,<br>Nexus Procurement Team</p>
            </div>
          `
        });
        console.log(`[Email System] Message sent: %s`, info.messageId);
      } catch (emailErr) {
        console.error('[Email System] SMTP Send Error:', emailErr);
        console.warn('[Email System] Invitation created, but email delivery failed. Continuing workflow.');
      }
    } else {
      console.warn('[Email System] WARNING: Email transporter is not initialized. Email was not sent.');
    }

    res.status(201).json({ message: 'Invitation created successfully', invitationId, token, emailSent: !!transporter });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invitation: ' + err.message });
  }
});

// GET /api/invitations
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const invitations = await db.all('SELECT * FROM vendor_invitations ORDER BY created_at DESC');
    res.json(invitations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invitations.' });
  }
});

// GET /api/invitations/:token
router.get('/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const db = await getDb();
    const invitation = await db.get('SELECT * FROM vendor_invitations WHERE token = ?', [token]);
    
    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found or invalid.' });
    }

    if (new Date(invitation.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Invitation has expired.' });
    }

    if (invitation.status === 'Completed' || invitation.status === 'Cancelled') {
      return res.status(400).json({ error: `Invitation is already ${invitation.status}.` });
    }

    if (invitation.status === 'Pending') {
      await db.run('UPDATE vendor_invitations SET status = ?, opened_at = ? WHERE id = ?', ['Opened', new Date().toISOString(), invitation.id]);
      invitation.status = 'Opened';
    }

    res.json(invitation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to validate token.' });
  }
});

export default router;
