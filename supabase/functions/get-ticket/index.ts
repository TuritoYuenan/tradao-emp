import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { connectSupabase } from "../_shared/supabase.ts";

// Input via header: { "ticket-id": string }
// Output: { ticket: Ticket, saveURL: string }
Deno.serve(async (req) => {
	const ticketId = req.headers.get("ticket-id");
	if (!ticketId) {
		return new Response("Ticket ID is required", { status: 400 });
	}

	const supabase = connectSupabase("anon", req.headers.get("Authorization"),);

	const { data, error } = await supabase
		.from("event_tickets")
		.select("*")
		.eq("id", ticketId)
		.limit(1)
		.single();

	if (error) {
		return new Response(error.message, { status: 500 });
	}

	if (!data) {
		return new Response("Ticket not found", { status: 404 });
	}

	return new Response(JSON.stringify({ ticket: data, saveURL: "" }), {
		headers: { "Content-Type": "application/json" },
	});
})
