import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createPassClass, createPassObject, getPassSaveUrl } from "../_shared/googleWallet.ts";
import { connectSupabase } from "../_shared/supabase.ts";
import { errorResponse } from "../_shared/utils.ts";

// Input via query parameter: { "ticketID": string }
// Output: { ticket: Ticket, saveURL: string }
Deno.serve(async (req) => {
	try {
		const url = new URL(req.url);
		const ticketId = url.searchParams.get("ticketID");
		if (!ticketId) return errorResponse(400, "Missing ticketID query parameter");

		const supabase = connectSupabase("anon", req.headers.get("Authorization"),);
		const { data, error } = await supabase
			.from('tickets_with_event_details')
			.select('*')
			.eq('ticket_id', ticketId)
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
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return errorResponse(500, `Internal Server Error: ${errorMessage}`);
	}
})
