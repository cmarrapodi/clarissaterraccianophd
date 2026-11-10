import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const fallbackSupabase = {
  auth: {
    signInWithPassword: async () => ({
      error: { message: 'Supabase is not configured for this local preview.' },
    }),
  },
  from: () => ({
    insert: async () => ({ error: { message: 'Supabase is not configured for this local preview.' } }),
    update: () => ({
      eq: () => ({
        order: () => ({
          limit: async () => ({ error: { message: 'Supabase is not configured for this local preview.' } }),
        }),
      }),
    }),
    select: () => ({
      order: () => ({
        limit: async () => ({ error: { message: 'Supabase is not configured for this local preview.' } }),
      }),
    }),
  }),
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : fallbackSupabase
