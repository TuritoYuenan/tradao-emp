import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './models';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

/**
 * Create a Supabase client for use in the browser
 */
export function createSupabaseClient() {
	return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY);
}
