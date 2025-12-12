import { json, error as svelteError } from '@sveltejs/kit';
import { errorResponse } from '$lib/utils';
import { eventCreationSchema } from '$lib/validation';
import type { RequestHandler } from './$types';
import type { InferType, ValidationError } from 'yup';

type EventCreationProps = InferType<typeof eventCreationSchema>;

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const body = await request.json();

	try {
		const eventForm = eventCreationSchema.cast(body) as EventCreationProps;

		const { status, error, data: insertedData } = await supabase
			.from('community_events')
			.upsert([eventForm])
			.select();

		if (error) return errorResponse(status, error.message);

		return json({ event: insertedData[0] }, { status });
	} catch (e) {
		if ((e as ValidationError).name === 'ValidationError') {
			return errorResponse(400, (e as ValidationError).errors);
		}
		if (e instanceof Error) return errorResponse(400, e.message);

		return errorResponse(400, 'Invalid request body');
	}
};
