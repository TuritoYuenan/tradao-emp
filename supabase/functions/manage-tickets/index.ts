import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { walletClient } from "../_shared/googleWallet.ts";

Deno.serve(async (req) => {
	try {
		const res2 = await walletClient.genericobject.list({
			classId: "3388000000022919404.gmgf_entry_ticket",
		})

		return new Response(JSON.stringify(res2), {
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
