import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (
	{ params, locals: { supabase } },
) => {
	const { data: event, error: eventError } = await supabase
		.from("community_events")
		.select("*, organiser: event_organisers( * )")
		.eq("id", params.id)
		.limit(1)
		.single();

	const { data: academicStatus, error: statusError } = await supabase
		.from("academic_status")
		.select("*");

	const { data: fieldsOfStudy, error: fieldsError } = await supabase
		.from("fields_of_study")
		.select("*");

	if (eventError) throw eventError;
	if (statusError) throw statusError;
	if (fieldsError) throw fieldsError;

	if (!event) throw error(404, "Event not found");

	return { event: event, academicStatus, fieldsOfStudy };
};
