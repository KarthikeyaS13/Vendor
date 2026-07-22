import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nexus_admin_secret_key_2026';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // For now, if no token, we just continue without req.user
    // This allows mixed endpoints (admin vs vendor vs public)
    // to handle authorization individually if they want.
    // However, to enforce it, we can return 401. Let's allow it to pass but without req.user,
    // so the route can decide.
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};
