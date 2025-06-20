import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";
import supabase from "$lib/supabase";

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
	let { data, error: err } = await supabase
		.functions.invoke("get-ticket", {
			method: "GET",
			headers: { "ticket-id": params.id },
		});

	if (err) error(500, err.message);
	return {
		ticket: data.ticket,
		saveURL: data.saveURL,
	};
};
