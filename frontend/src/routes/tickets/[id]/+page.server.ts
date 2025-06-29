import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";
import supabase from "$lib/supabase";

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
	let { data, error: err } = await supabase
		.functions.invoke(`get-ticket?ticketID=${encodeURIComponent(params.id)}`, {
			method: "GET",
			headers: {}
		});

	if (err) error(500, err.message);
	return { ...data };
};
