import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { classId, walletClient } from "../_shared/googleWallet.ts";

Deno.serve(async (req) => {
	try {
		const response = await walletClient.genericobject.list({ classId })

		return new Response(JSON.stringify(response), {
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
