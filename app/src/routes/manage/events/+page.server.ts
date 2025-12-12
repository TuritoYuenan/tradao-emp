import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from("community_events")
		.select("*")
		.order("start_time", { ascending: false });

	if (error) {
		console.error(error);
		return { events: [] };
	}

	return { events: data ?? [] };
}) satisfies PageServerLoad;
