import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (
	{ params, locals: { supabase } },
) => {
	const { data, error: dbError } = await supabase
		.from("community_events")
		.select("*")
		.eq("id", params.id)
		.limit(1)
		.single();

	if (dbError) throw dbError;
	if (!data) throw error(404, "Event not found");

	return { event: data };
};
