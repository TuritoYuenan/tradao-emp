import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { connectSupabase } from "../_shared/supabase.ts";
import { error } from "node:console";

function errorResponse(message: string, status: number = 500) {
	error("%d: %s", status, message);
	return new Response(
		JSON.stringify({ error: message }),
		{ status, headers: { "Content-Type": "application/json" } }
	);
}

// Input via header: { "ticket-id": string }
// Output: { ticket: Ticket, saveURL: string }
Deno.serve(async (req) => {
	const url = new URL(req.url);
	const ticketId = url.searchParams.get("ticket-id");
	if (!ticketId) return errorResponse("Missing ticket-id query parameter", 400);

	const supabase = connectSupabase("anon", req.headers.get("Authorization"),);
	const { data, error } = await supabase
		.from('tickets_with_event_details')
		.select('*')
		.eq('ticket_id', ticketId)
		.limit(1)
		.single();

	if (error) return errorResponse(error.message, 500);
	if (!data) return errorResponse("Ticket not found", 404);

	return new Response(JSON.stringify({
		ticket: {
			id: data.ticket_id,
			eventId: data.event_id,
			name: data.name,
			email: data.email,
			createdAt: data.created_at,
		}, event: {
			id: data.event_id,
			name: data.event_title,
			startDate: data.event_start_time,
			endDate: data.event_end_time,
			location: data.event_location,
			image: data.event_image,
			description: data.event_description,
		}, saveURL: ""
	}), { headers: { "Content-Type": "application/json" } });
})
