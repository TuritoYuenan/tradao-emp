import { define } from '$lib/utils.ts';
import { supabase } from '$lib/supabase.ts';
import { errorResponse } from '$lib/utils.ts';
import { eventCreationSchema } from '$lib/validation.ts';
import { InferType, ValidationError } from 'yup';

type EventCreationProps = InferType<typeof eventCreationSchema>;

export const handler = define.handlers({
	async POST(ctx) {
		const req = ctx.req;
		const body = await req.json();

		try {
			const eventForm = eventCreationSchema.cast(body) as EventCreationProps;

			const { status, error } = await supabase
				.from('community_events')
				.upsert([eventForm]);

			if (error) return errorResponse(status, error.message);

			return new Response(JSON.stringify({ eventID: 'a' }), {
				status,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (e) {
			if (e instanceof ValidationError) return errorResponse(400, e.errors);
			if (e instanceof Error) return errorResponse(400, e.message);

			return errorResponse(400, 'Invalid request body');
		}
	},

	async GET(ctx) {
		const req = ctx.req;
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
});
