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

// Input via query parameter: { "ticketID": string }
// Output: { ticket: Ticket, saveURL: string }
Deno.serve(async (req) => {
	const url = new URL(req.url);
	const ticketId = url.searchParams.get("ticketID");
	if (!ticketId) return errorResponse("Missing ticketID query parameter", 400);

	const supabase = connectSupabase("anon", req.headers.get("Authorization"),);
	const { data, error } = await supabase
		.from('tickets_with_event_details')
		.select('*')
		.eq('ticket_id', ticketId)
		.limit(1)
		.single();

	if (error) return errorResponse(error.message, 500);
	if (!data) return errorResponse("Ticket not found", 404);

	return new Response(
		JSON.stringify({ lookup: data, saveURL: "" }),
		{ headers: { "Content-Type": "application/json" } }
	);
})
