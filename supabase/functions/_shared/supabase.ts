import { createClient } from 'npm:@supabase/supabase-js@2'
import { Database } from './models.ts';

export function connectSupabase(type: 'service' | 'anon' = 'anon', auth: string | null = null) {
	const key = {
		'service': "SUPABASE_SERVICE_ROLE_KEY",
		'anon': "SUPABASE_ANON_KEY"
	}

	return createClient<Database>(
		Deno.env.get("SUPABASE_URL") || "",
		Deno.env.get(key[type]) || "",
		{ global: { headers: { Authorization: auth! } } }
	);
}
