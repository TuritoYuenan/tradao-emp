import { getSupabaseClient } from './utils.ts';

/**
 * Connects to the Supabase client
 */
export const supabase = getSupabaseClient(
	Deno.env.get('SUPABASE_URL') || '',
	Deno.env.get('SUPABASE_KEY') || ''
);
