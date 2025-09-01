import { createPassClass, createPassObject, getPassSaveUrl } from '$lib/googleWallet';
import supabase from '$lib/supabase';
import { errorResponse } from '$lib/utilities';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }: { url: URL }) => {
	const ticketID = url.searchParams.get('ticketID');

	if (!ticketID) return errorResponse(400, "Missing ticketID query parameter");

	const { data, error } = await supabase
		.from('tickets_with_event_details')
		.select('*')
		.eq('ticket_id', ticketID)
		.limit(1)
		.single();

	if (error) return errorResponse(500, error.message);
	if (!data) return errorResponse(404, "Ticket not found");

	const classID = await createPassClass();
	const objectID = await createPassObject(classID, data);
	const saveURL = await getPassSaveUrl(objectID);

	return new Response(
		JSON.stringify({ lookup: data, saveURL }),
		{ headers: { "Content-Type": "application/json" } }
	);
};
