import { beforeAll, describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect/expect';
import { load as loadEnvs } from '@std/dotenv';

import { getSupabaseClient } from '$lib/utils.ts';

describe('Database Connection', () => {
	let client: ReturnType<typeof getSupabaseClient>;

	beforeAll(async () => {
		await loadEnvs({ export: true });

		const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
		const SUPABASE_KEY = Deno.env.get('SUPABASE_KEY');

		if (!SUPABASE_URL || !SUPABASE_KEY) {
			throw new Error('SUPABASE_URL and SUPABASE_KEY must be set in environment variables');
		}

		client = getSupabaseClient(SUPABASE_URL, SUPABASE_KEY);
	});

	it('should connect to the database and fetch data', async () => {
		const { data, error } = await client.from('upcoming_events').select('*').limit(1);
		if (error) throw new Error(`Database query failed: ${error.message}`);

		expect(data).toBeDefined();
		expect(data.length).toBeGreaterThan(0);
	});
});
