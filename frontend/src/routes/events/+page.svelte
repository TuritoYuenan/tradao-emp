<script lang="ts">
	import type { Tables } from "$lib/models";
	import Banner from "$components/Banner.svelte";
	import EventCard from "$components/EventCard.svelte";
	import Title from "$components/Title.svelte";

	const EVENTS_PER_PAGE = 5;

	let { data }: { data: { events: Tables<"upcoming_events">[] } } = $props();
	let currentPage = $state(1);

	// State for search, filter, and pagination
	let search = $state("");
	let selectedCategory = $state("");

	function totalPages() {
		return Math.ceil(filteredEvents().length / EVENTS_PER_PAGE);
	}

	const pagedEvents = $derived(() => {
		const start = (currentPage - 1) * EVENTS_PER_PAGE;
		const end = currentPage * EVENTS_PER_PAGE;
		return filteredEvents().slice(start, end);
	});

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	function nextPage() {
		if (currentPage < totalPages()) currentPage++;
	}

	// Extract unique categories from events
	const categories = Array.from(
		new Set(data.events.map((e) => e.category).filter(Boolean)),
	);

	// Filter and search logic
	const filteredEvents = $derived(() => {
		return data.events.filter((event) => {
			const matchesSearch =
				event.title?.toLowerCase().includes(search.toLowerCase()) ||
				event.description?.toLowerCase().includes(search.toLowerCase());
			const matchesCategory =
				!selectedCategory || event.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	});
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

<Title title="Events" />

<Banner
	title="Upcoming Events"
	description="Check out the latest workshops, conferences, public talks and discussions in ITea Lab!"
/>

<article>
	<!-- Search and filter -->
	<search class="filters">
		<input
			type="text"
			placeholder="Search by title or description"
			bind:value={search}
		/>
		<select bind:value={selectedCategory}>
			<option value="">All Categories</option>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</search>

	{@render paginationButtons()}

	{#each pagedEvents() as event}
		<EventCard {event} />
	{/each}
	{#if filteredEvents().length === 0}
		<p>No events found.</p>
	{/if}

	{@render paginationButtons()}
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

	.pagination {
		margin-block: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.filters {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 3fr 1fr;
	}

	.filters > * {
		padding: 0.75rem 1rem;
		font-size: 1rem;
		color: inherit;
		background-color: transparent;
		border: 2px solid var(--foreground);
		border-radius: 1rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
	}
</style>
