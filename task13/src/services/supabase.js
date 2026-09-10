import { createClient } from '@supabase/supabase-js'

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check whether custom valid Supabase credentials were provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-project')
)

// Create Supabase Client instance
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Initial Expanded Mock Dataset
export const INITIAL_MOCK_USERS = [
  {
    id: 'usr_101',
    full_name: 'Sophia Martinez',
    email: 'sophia.martinez@userhub.io',
    phone: '+1 (555) 234-5678',
    gender: 'Female',
    city: 'San Francisco',
    country: 'United States',
    role: 'Admin',
    status: 'Active',
    created_at: '2026-01-15T09:30:00Z',
    profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_102',
    full_name: 'Alexander Wright',
    email: 'alex.wright@techflow.com',
    phone: '+1 (555) 876-5432',
    gender: 'Male',
    city: 'London',
    country: 'United Kingdom',
    role: 'Editor',
    status: 'Active',
    created_at: '2026-02-01T14:15:00Z',
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_103',
    full_name: 'Elena Rostova',
    email: 'elena.rostova@designlab.org',
    phone: '+49 30 123456',
    gender: 'Female',
    city: 'Berlin',
    country: 'Germany',
    role: 'Manager',
    status: 'Pending',
    created_at: '2026-02-12T11:45:00Z',
    profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_104',
    full_name: 'Marcus Vance',
    email: 'marcus.v@cloudscale.net',
    phone: '+1 (555) 345-6789',
    gender: 'Male',
    city: 'Toronto',
    country: 'Canada',
    role: 'Viewer',
    status: 'Inactive',
    created_at: '2025-11-20T16:20:00Z',
    profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_105',
    full_name: 'Aisha Patel',
    email: 'aisha.patel@innovate.in',
    phone: '+91 98765 43210',
    gender: 'Female',
    city: 'Mumbai',
    country: 'India',
    role: 'Admin',
    status: 'Active',
    created_at: '2026-03-05T08:10:00Z',
    profile_image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_106',
    full_name: 'Liam O\'Connor',
    email: 'liam.oconnor@dublincode.ie',
    phone: '+353 1 496 0123',
    gender: 'Male',
    city: 'Dublin',
    country: 'Ireland',
    role: 'Editor',
    status: 'Active',
    created_at: '2026-03-18T17:05:00Z',
    profile_image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_107',
    full_name: 'Camila Tanaka',
    email: 'camila.tanaka@tokyomedia.jp',
    phone: '+81 3 1234 5678',
    gender: 'Female',
    city: 'Tokyo',
    country: 'Japan',
    role: 'Manager',
    status: 'Active',
    created_at: '2026-04-02T10:00:00Z',
    profile_image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_108',
    full_name: 'David Chen',
    email: 'david.chen@synergy.io',
    phone: '+1 (555) 901-2345',
    gender: 'Male',
    city: 'Seattle',
    country: 'United States',
    role: 'Viewer',
    status: 'Pending',
    created_at: '2026-04-14T13:40:00Z',
    profile_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_109',
    full_name: 'Zoe Dupont',
    email: 'zoe.dupont@paristech.fr',
    phone: '+33 1 42 68 55 00',
    gender: 'Female',
    city: 'Paris',
    country: 'France',
    role: 'Editor',
    status: 'Inactive',
    created_at: '2025-12-01T15:30:00Z',
    profile_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_110',
    full_name: 'Ethan Brooks',
    email: 'ethan.brooks@austinventures.com',
    phone: '+1 (555) 678-9012',
    gender: 'Male',
    city: 'Austin',
    country: 'United States',
    role: 'Admin',
    status: 'Active',
    created_at: '2026-05-10T19:25:00Z',
    profile_image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_111',
    full_name: 'Isabella Silva',
    email: 'isabella.silva@saopaulo.br',
    phone: '+55 11 98765-4321',
    gender: 'Female',
    city: 'São Paulo',
    country: 'Brazil',
    role: 'Manager',
    status: 'Active',
    created_at: '2026-05-22T08:40:00Z',
    profile_image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_112',
    full_name: 'Noah Weber',
    email: 'noah.weber@zurichfin.ch',
    phone: '+41 44 234 56 78',
    gender: 'Male',
    city: 'Zurich',
    country: 'Switzerland',
    role: 'Editor',
    status: 'Active',
    created_at: '2026-06-04T12:15:00Z',
    profile_image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  }
]

let localMockUsers = [...INITIAL_MOCK_USERS]

export async function fetchUsersFromSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    await new Promise((res) => setTimeout(res, 500))
    return { data: [...localMockUsers], isMock: true, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Supabase returned error:', error.message)
      return { data: [...localMockUsers], isMock: true, error: error.message }
    }

    return { data: data || [], isMock: false, error: null }
  } catch (err) {
    console.error('Unexpected Supabase connection error:', err)
    return { data: [...localMockUsers], isMock: true, error: err.message }
  }
}

export async function createNewUser(userData) {
  const newUser = {
    id: userData.id || `usr_${Date.now()}`,
    full_name: userData.full_name,
    email: userData.email,
    phone: userData.phone || '+1 (555) 000-0000',
    gender: userData.gender || 'Other',
    city: userData.city || 'San Francisco',
    country: userData.country || 'United States',
    role: userData.role || 'Viewer',
    status: userData.status || 'Active',
    created_at: new Date().toISOString(),
    profile_image: userData.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.full_name)}&background=2563EB&color=fff`
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()

      if (!error && data) {
        return { data: data[0], error: null }
      }
    } catch (err) {
      console.warn('Supabase insert failed, using fallback:', err)
    }
  }

  localMockUsers = [newUser, ...localMockUsers]
  return { data: newUser, error: null }
}

export async function deleteUserById(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('users').delete().eq('id', id)
    } catch (err) {
      console.warn('Supabase delete error:', err)
    }
  }

  localMockUsers = localMockUsers.filter(u => u.id !== id)
  return { success: true }
}

export async function bulkDeleteUsers(ids = []) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('users').delete().in('id', ids)
    } catch (err) {
      console.warn('Supabase bulk delete error:', err)
    }
  }

  localMockUsers = localMockUsers.filter(u => !ids.includes(u.id))
  return { success: true }
}

export async function bulkUpdateStatus(ids = [], newStatus) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('users').update({ status: newStatus }).in('id', ids)
    } catch (err) {
      console.warn('Supabase bulk update error:', err)
    }
  }

  localMockUsers = localMockUsers.map(u => ids.includes(u.id) ? { ...u, status: newStatus } : u)
  return { success: true }
}

export async function updateUserRecord(id, updatedFields) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updatedFields)
        .eq('id', id)
        .select()

      if (!error && data) return { data: data[0], error: null }
    } catch (err) {
      console.warn('Supabase update failed:', err)
    }
  }

  localMockUsers = localMockUsers.map(u => u.id === id ? { ...u, ...updatedFields } : u)
  const updated = localMockUsers.find(u => u.id === id)
  return { data: updated, error: null }
}

export function generateUserLogs(user) {
  return [
    { id: 1, action: 'User Authenticated', ip: '192.168.1.45', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'Success' },
    { id: 2, action: 'Profile Details Updated', ip: '192.168.1.45', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'Success' },
    { id: 3, action: 'Password Change Request', ip: '10.0.0.12', timestamp: new Date(Date.now() - 172800000).toISOString(), status: 'Verified' },
    { id: 4, action: 'Supabase Role Assigned: ' + (user?.role || 'Viewer'), ip: 'System', timestamp: user?.created_at || new Date().toISOString(), status: 'System' }
  ]
}

export const SUPABASE_SQL_SCRIPT = `-- Execute this SQL in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  gender TEXT,
  city TEXT,
  country TEXT,
  role TEXT DEFAULT 'Viewer',
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  profile_image TEXT
);

-- Enable RLS (Row Level Security) and allow public read access
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.users FOR DELETE USING (true);
`
