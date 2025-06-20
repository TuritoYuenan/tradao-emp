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

	const { data: ticket, error } = await supabase
		.from("event_tickets")
		.select("*")
		.eq("id", ticketId)
		.limit(1)
		.single();

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	if (!ticket) {
		return new Response(JSON.stringify({ error: "Ticket not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response(JSON.stringify({ ticket, saveURL: "" }), {
		headers: { "Content-Type": "application/json" },
	});
})
