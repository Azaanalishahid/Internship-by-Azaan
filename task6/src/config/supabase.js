import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Warning: SUPABASE_URL or SUPABASE_ANON_KEY is missing in environment variables.');
}

// Initialize Supabase Client with persistent session disabled for backend API operations
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder', {
  auth: {
    persistSession: false, // Server-side environment: avoid storing session state globally
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});
