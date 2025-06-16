// 1. Receive a JSON registration form submission
// 2. Insert to the `tickets` table, which automatically generates a UUID
// 3. Prepare a Google Wallet pass object and POST to the Google Wallet API
// 4. Return a JSON response with the pass URL. Error if failed
// https://medium.com/@AlexanderObregon/json-schema-a-guide-to-validating-your-json-data-9f225b2a17ef

// `tickets` table schema: View schema.sql

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { connectSupabase } from "../_shared/supabase.ts";

console.log("Hello from Functions!")

Deno.serve(async (req) => {
	if (req.method !== "POST") {
		return new Response("Method Not Allowed", { status: 405 });
	}

	try {
		const supabase = connectSupabase('anon', req.headers.get("Authorization"));
		const body = await req.json();
		console.log("Received body:", body);

		const { data, error } = await supabase
			.rpc("create_event_ticket", {
				p_event_id: body.event_id,
				p_name: body.name,
				p_email: body.email,
				p_academic_year: body.academic_year,
				p_field_of_study: body.field_of_study,
				p_major: body.major,
				p_participate: body.agreed_to_participate,
			});

		if (error) {
			console.error("Error inserting data:", error);
			return new Response(JSON.stringify({ error: error.message }), {
				headers: { "Content-Type": "application/json" },
				status: 400
			});
		}

		const response = {
			passUrl: "https://example.com/pass/12345",
			ticketId: data,
		};

		return new Response(JSON.stringify(response), {
			headers: { "Content-Type": "application/json" },
			status: 200,
		});
	} catch (error) {
		console.error("Error processing request:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
});
