import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase } }) => {
	const { data: events, error: eventsError } = await supabase
		.from("community_events")
		.select("*")
		.order("start_time", { ascending: false });

	// For each event, get the number of attendees by counting the number of event tickets
	const eventsWithAttendeeCount = await Promise.all(
		(events ?? []).map(async (event) => {
			const { count } = await supabase
				.from("event_tickets")
				.select("*", { count: "exact", head: true })
				.eq("event_id", event.id);

			return { ...event, attendee_count: count };
		})
	);

	if (eventsError) {
		console.error(eventsError);
		return { events: [] };
	}

	return { events: eventsWithAttendeeCount ?? [] };
}) satisfies PageServerLoad;
