import { supabase } from "$lib/supabase";

export async function load() {
	let { data: community_events, error } = await supabase
		.from('community_events')
		.select('*')

	return { events: community_events ?? [], };
}
