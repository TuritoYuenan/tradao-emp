import { createPassClass, createPassObject, getPassSaveUrl } from '$lib/googleWallet.ts';
import { errorResponse } from '$lib/utils.ts';
import { supabase } from '$lib/supabase.ts';
import { Handlers } from '$fresh/server.ts';
import { TicketLookupProps } from '$lib/props.ts';

export const handler: Handlers<TicketLookupProps> = {
	async GET(_req, ctx) {
		const ticketID = ctx.params.id;

		const { data, error } = await supabase
			.from('tickets_with_event_details')
			.select('*')
			.eq('ticket_id', ticketID)
			.limit(1)
			.single();

		if (error) return errorResponse(500, error.message);
		if (!data) return errorResponse(404, 'Ticket not found');

		const classID = await createPassClass();
		const objectID = await createPassObject(classID, data);
		const saveURL = await getPassSaveUrl(objectID);

		return new Response(
			JSON.stringify({ lookup: data, saveURL }),
			{ headers: { 'Content-Type': 'application/json' } },
		);
	},
};
