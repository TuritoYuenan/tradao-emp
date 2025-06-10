<script lang="ts">
	import type { Database, Tables } from "$lib/models";
	import Banner from "../../components/Banner.svelte";
	import EventCard from "../../components/EventCard.svelte";

	const EVENTS_PER_PAGE = 5;

	let { data }: { data: { events: Tables<"community_events">[] } } = $props();
	let currentPage = $state(1);

	function totalPages() {
		return Math.ceil(data.events.length / EVENTS_PER_PAGE);
	}

	function pagedEvents() {
		const start = (currentPage - 1) * EVENTS_PER_PAGE;
		const end = currentPage * EVENTS_PER_PAGE;
		return data.events.slice(start, end);
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	function nextPage() {
		if (currentPage < totalPages()) currentPage++;
	}
</script>

{#snippet paginationButtons()}
	<nav class="pagination">
		<button onclick={prevPage} disabled={currentPage === 1}>
			Previous
		</button>
		<span>Page {currentPage} of {totalPages()}</span>
		<button onclick={nextPage} disabled={currentPage === totalPages()}>
			Next
		</button>
	</nav>
{/snippet}

<Banner
	title="Upcoming Events"
	description="Check out the latest workshops, conferences, public talks and discussions in ITea Lab!"
/>

{@render paginationButtons()}

<article>
	{#each pagedEvents() as event}
		<EventCard {event} />
	{/each}
</article>

{@render paginationButtons()}

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

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin: 2rem 0;
	}
</style>
