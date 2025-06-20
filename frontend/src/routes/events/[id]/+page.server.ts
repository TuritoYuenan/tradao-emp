import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";
import supabase from "$lib/supabase";

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
	let { data: event, error: err, status } = await supabase
		.from("community_events")
		.select("*")
		.eq("id", params.id)
		.limit(1)
		.single();

	if (err) error(status, err.message);
	return { event };
};
