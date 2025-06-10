import supabase from "$lib/supabase";

export async function load() {
	let { data: community_events, error } = await supabase
		.from('community_events')
		.select('*')

	if (error) return { error: error.message };
	return { events: community_events ?? [], url: import.meta.env.VITE_SUPABASE_URL };
}
