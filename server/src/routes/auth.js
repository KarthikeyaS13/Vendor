import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../config/db.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'nexus_admin_secret_key_2026';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 1. Check for hardcoded admin first
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign(
      { role: 'admin', username: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return res.json({
      success: true,
      token,
      user: {
        username: 'admin',
        role: 'admin'
      }
    });
  }

  // 2. Check users table for admin/internal users (if not hardcoded)
  try {
    const db = await getDb();
    
    // Check vendor_users first
    const vendorUser = await db.get(
      'SELECT * FROM vendor_users WHERE email = ?',
      [username]
    );

    if (vendorUser) {
      const passwordMatch = await bcrypt.compare(password, vendorUser.password_hash);
      if (passwordMatch) {
        if (!vendorUser.is_active) {
          return res.status(401).json({ success: false, error: 'Account is deactivated' });
        }

        if (vendorUser.must_change_password) {
          return res.json({
            success: true,
            requiresPasswordChange: true,
            email: vendorUser.email
          });
        }

        const token = jwt.sign(
          { 
            userId: vendorUser.id, 
            vendorId: vendorUser.vendor_id, 
            email: vendorUser.email,
            role: vendorUser.role
          },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        
        return res.json({
          success: true,
          token,
          user: {
            id: vendorUser.id,
            vendorId: vendorUser.vendor_id,
            email: vendorUser.email,
            role: vendorUser.role
          }
        });
      }
    }

    // Check users table (legacy / internal admins)
    const user = await db.get(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (user) {
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      
      if (passwordMatch) {
        const token = jwt.sign(
          { 
            userId: user.id, 
            vendorId: user.vendor_id, 
            username: user.username,
            role: user.role
          },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        
        return res.json({
          success: true,
          token,
          user: {
            id: user.id,
            vendorId: user.vendor_id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }

  // 3. If neither matched, fail
  return res.status(401).json({ success: false, error: 'Invalid credentials' });
});

// 4. Change Password Endpoint
router.post('/vendor/change-password', async (req, res) => {
  const { email, tempPassword, newPassword } = req.body;
  
  if (!email || !tempPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const db = await getDb();
    const vendorUser = await db.get('SELECT * FROM vendor_users WHERE email = ?', [email]);
    
    if (!vendorUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(tempPassword, vendorUser.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid temporary password' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    
    await db.run(
      'UPDATE vendor_users SET password_hash = ?, must_change_password = false, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newPasswordHash, vendorUser.id]
    );

    const token = jwt.sign(
      { 
        userId: vendorUser.id, 
        vendorId: vendorUser.vendor_id, 
        email: vendorUser.email,
        role: vendorUser.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: vendorUser.id,
        vendorId: vendorUser.vendor_id,
        email: vendorUser.email,
        role: vendorUser.role
      }
    });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
