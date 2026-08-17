import { supabase } from '../config/supabase.js';

/**
 * Middleware to verify Supabase JWT Access Token in the Authorization header.
 * Header format: Authorization: Bearer <access_token>
 */
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Missing or invalid Authorization header. Expected format: Bearer <access_token>'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Bearer token is missing.'
      });
    }

    // Verify token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: error ? error.message : 'Invalid or expired session token.'
      });
    }

    // Attach user object to request
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};
