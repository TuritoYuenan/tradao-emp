import { createClient } from '@supabase/supabase-js';
import { Database } from './models.ts';

/**
 * Connects to the Supabase client
 */
export const supabase = createClient<Database>(
	Deno.env.get('SUPABASE_URL') || '',
	Deno.env.get('SUPABASE_KEY') || '',
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false,
		},
	},
);
