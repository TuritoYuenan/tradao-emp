<script lang="ts">
	import type { Tables } from "$lib/models";
	import { formatDate, isEventUpcoming } from "$lib/utils";

	let { event }: { event: Tables<"community_events"> } = $props();
</script>

<article class="no-padding grid middle-align border">
	<div class="s12 m4">
		<img
			class="responsive"
			src={event.image ? event.image : "https://placehold.co/160x90"}
			alt={event.title || "Event image"}
		/>
	</div>
	<div class="padding s12 m8">
		<h2 class="small">{event.title}</h2>
		<p>
			<i>event</i> <strong>Date:</strong>
			{event.start_time ? formatDate(event.start_time) : "N/A"}
			&ndash; {event.end_time ? formatDate(event.end_time) : "N/A"}
		</p>
		<p>
			<i>location_on</i> <strong>Location:</strong>
			{event.location}
		</p>
		<div class="space"></div>
		<a class="button" href={`/events/${event.id}`}>
			{isEventUpcoming(event.start_time!) ? "Register" : "View"}
		</a>
	</div>
</article>
