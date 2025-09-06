import { Tables } from '$lib/models.ts';
import { Handlers } from '$fresh/server.ts';
import { supabase } from '$lib/supabase.ts';
import { errorResponse } from '$lib/utils.ts';

export const handler: Handlers<Tables<'community_events'>> = {
	async POST(req, _ctx) {
		const event = (await req.json()) as Tables<'community_events'>;
		const { error } = await supabase
			.from('community_events')
			.insert([event]);

		if (error) return errorResponse(500, error.message);

		return new Response(JSON.stringify({ success: true, event }), {
			headers: { 'Content-Type': 'application/json' },
		});
	},

	async GET(req, _ctx) {
		const url = new URL(req.url);
		const upcoming = url.searchParams.get('upcoming') === 'true';

		const query = upcoming
			? supabase
				.from('upcoming_events')
				.select('*')
				.order('start_time', { ascending: true })
			: supabase
				.from('community_events')
				.select('*')
				.order('start_time', { ascending: true });

		const { data, error } = await query;

		if (error) return errorResponse(500, error.message);

		return new Response(JSON.stringify({ success: true, events: data }), {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
