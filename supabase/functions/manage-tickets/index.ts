import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { client } from "../_shared/googleWallet.ts";

const baseURL = 'https://walletobjects.googleapis.com/walletobjects/v1'

Deno.serve(async (req) => {
	try {
		const response = await client.fetch(`${baseURL}/genericObject?classId=3388000000022919404.gmgf_entry_ticket`, {
			method: "GET",
			headers: { "Content-Type": "application/json", }
		})

		return new Response(JSON.stringify(response.data.resources), {
			headers: { "Content-Type": "application/json", }
		})
	} catch (error) {
		console.error("Error fetching generic object:", error);
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json", }
		});
	}
})
