// 1. Receive a JSON registration form submission
// 2. Insert to the `tickets` table, which automatically generates a UUID
// 3. Prepare a Google Wallet pass object and POST to the Google Wallet API
// 4. Return a JSON response with the pass URL. Error if failed
// https://medium.com/@AlexanderObregon/json-schema-a-guide-to-validating-your-json-data-9f225b2a17ef

// `tickets` table schema:
// CREATE TABLE IF NOT EXISTS event_tickets (
//	`id` SERIAL PRIMARY KEY,
//	`event_id` INTEGER NOT NULL REFERENCES community_events(id) ON DELETE CASCADE,
//	`name` VARCHAR(255) NOT NULL,
//	`email` VARCHAR(255) NOT NULL,
//	`academic_year` academic_year NOT NULL,
//	`field_of_study` field_of_study NOT NULL,
//	`major` major NOT NULL,
//	`agreed_to_participate` BOOLEAN NOT NULL DEFAULT FALSE,
//	`code` VARCHAR(50) UNIQUE NOT NULL,
//	`issued_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

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
			.from('event_tickets')
			.insert(body)
			.select('id')
			.single()

		if (error) {
			console.error("Error inserting data:", error);
			return new Response(JSON.stringify({ error: error.message }), {
				headers: { "Content-Type": "application/json" },
				status: 400
			});
		}

		const response = {
			passUrl: "https://example.com/pass/12345",
			ticketId: data.id,
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
