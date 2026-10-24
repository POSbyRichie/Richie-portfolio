import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Anon key is public by design — security is enforced by Supabase RLS policies.
// Hardcoded as fallbacks so the build works in all environments (Figma Make sandbox,
// Vercel, local dev). Override by setting VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.
const SUPABASE_URL = "https://ibjfqukameghludinpan.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliamZxdWthbWVnaGx1ZGlucGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDc0MTAsImV4cCI6MjA5NjUyMzQxMH0.10g_Vts4sByca58qQaE7Al3TUrZM94PoWnBAxHN3Dbw";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || SUPABASE_URL;
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
