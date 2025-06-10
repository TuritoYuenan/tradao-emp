<script lang="ts">
	import type { Database, Tables } from "$lib/models";
	import Banner from "../../components/Banner.svelte";
	import EventCard from "../../components/EventCard.svelte";

	let { data }: { data: { events: Tables<"community_events">[] } } = $props();
</script>

<Banner
	title="Upcoming Events"
	description="Check out the latest workshops, conferences, public talks and discussions in ITea Lab!"
/>

<article>
	{#each data.events as event}
		<EventCard {event} />
	{/each}
</article>

<style>
	article {
		max-width: 960px;
		margin-inline: auto;
		gap: 1rem;
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (width <= 1080px) {
		article {
			margin-inline: 2rem;
		}
	}
</style>
