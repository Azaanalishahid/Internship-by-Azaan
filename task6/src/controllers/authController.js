import { supabase } from '../config/supabase.js';

// Helper function for simple email format validation
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user with Supabase Auth AND save record in custom 'app_users' table
 * @access  Public
 */
export const signUp = async (req, res, next) => {
  try {
    const { email, password, name, metadata } = req.body;

    // Input Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Email and password are required fields.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Please provide a valid email address.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Password must be at least 6 characters long.'
      });
    }

    // 1. Call Supabase Auth SignUp
    const userMetadata = {
      display_name: name || '',
      ...(metadata || {})
    };

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userMetadata
      }
    });

    if (authError) {
      const isRateLimit = authError.status === 429 || (authError.message && authError.message.toLowerCase().includes('rate limit'));
      
      return res.status(authError.status || (isRateLimit ? 429 : 400)).json({
        success: false,
        error: authError.name || (isRateLimit ? 'RateLimitExceeded' : 'SignUpError'),
        message: isRateLimit
          ? 'Supabase Auth email rate limit reached (429). Please disable "Confirm email" in Supabase Dashboard -> Authentication -> Providers -> Email.'
          : authError.message
      });
    }

    // 2. Save User Record in Custom Table 'app_users'
    let customUserData = null;

    if (authData.user) {
      const { data: insertedDbUser, error: dbError } = await supabase
        .from('app_users')
        .insert([
          {
            user_id: authData.user.id,
            email: authData.user.email,
            full_name: name || '',
            status: 'active'
          }
        ])
        .select()
        .single();

      if (dbError) {
        console.warn('⚠️ Warning inserting into app_users table:', dbError.message);
      } else {
        customUserData = insertedDbUser;
      }
    }

    const isEmailConfirmed = authData.user?.confirmed_at || authData.session !== null;

    return res.status(201).json({
      success: true,
      message: isEmailConfirmed
        ? 'User registered successfully and stored in app_users table!'
        : 'User registered successfully! If email confirmation is enabled, check email to confirm.',
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          user_metadata: authData.user.user_metadata,
          created_at: authData.user.created_at
        },
        custom_table_record: customUserData,
        session: authData.session ? {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_in: authData.session.expires_in,
          token_type: authData.session.token_type
        } : null
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & update last login in custom 'app_users' table
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Input Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Email and password are required fields.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Please provide a valid email address.'
      });
    }

    // 1. Call Supabase Auth SignIn
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return res.status(authError.status || 400).json({
        success: false,
        error: authError.name || 'LoginError',
        message: authError.message
      });
    }

    // 2. Update 'last_login_at' in Custom Table 'app_users'
    const nowIso = new Date().toISOString();
    let customUserData = null;

    const { data: updatedDbUser, error: updateError } = await supabase
      .from('app_users')
      .update({ last_login_at: nowIso })
      .eq('email', email)
      .select()
      .single();

    if (updateError) {
      console.warn('⚠️ Warning updating app_users table on login:', updateError.message);
    } else {
      customUserData = updatedDbUser;
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          user_metadata: authData.user.user_metadata,
          last_sign_in_at: authData.user.last_sign_in_at
        },
        custom_table_record: customUserData,
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_in: authData.session.expires_in,
          expires_at: authData.session.expires_at,
          token_type: authData.session.token_type
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Sign out user session
 * @access  Private (Requires Bearer token)
 */
export const logout = async (req, res, next) => {
  try {
    const { error } = await supabase.auth.signOut(req.token);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.name || 'LogoutError',
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh session tokens using refresh_token
 * @access  Public
 */
export const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'refresh_token is required.'
      });
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token });

    if (error) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.name || 'RefreshSessionError',
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Session refreshed successfully!',
      data: {
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_in: data.session.expires_in,
          expires_at: data.session.expires_at,
          token_type: data.session.token_type
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get currently authenticated user details & custom table profile
 * @access  Private (Requires Bearer token)
 */
export const getProfile = async (req, res) => {
  let customUserData = null;

  try {
    const { data: dbUser } = await supabase
      .from('app_users')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    customUserData = dbUser;
  } catch (err) {
    console.warn('Could not fetch custom profile:', err);
  }

  return res.status(200).json({
    success: true,
    data: {
      user: req.user,
      custom_table_record: customUserData
    }
  });
};
