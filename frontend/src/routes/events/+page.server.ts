import supabase from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
	let { data: community_events, error: err, status } = await supabase
		.from('community_events')
		.select('*')

	if (err) error(status, err.message);
	return { events: community_events ?? [] };
}
