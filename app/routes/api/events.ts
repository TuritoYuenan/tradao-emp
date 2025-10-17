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
	}
});
