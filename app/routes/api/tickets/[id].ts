import { Handlers } from '$fresh/server.ts';
import { supabase } from '$lib/supabase.ts';
import { errorResponse } from '$lib/utils.ts';
import { Tables } from '$lib/models.ts';

export const handler: Handlers<Tables<'event_tickets'>> = {
	async GET(_req, ctx) {
		const ticketID = ctx.params.id;

		const { data, error } = await supabase
			.from('event_tickets')
			.select('*')
			.eq('id', ticketID);

		if (error) return errorResponse(500, `Database error: ${error.message}`);
		if (data.length === 0) return errorResponse(404, 'Ticket not found');

		return new Response(JSON.stringify({ ticket: data[0] }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
