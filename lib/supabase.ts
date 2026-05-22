import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// TEMP DEBUG — remove later
console.log('🔑 BROWSER KEY:', supabaseAnonKey?.slice(0, 24), '| length:', supabaseAnonKey?.length)
console.log('🌐 BROWSER URL:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})