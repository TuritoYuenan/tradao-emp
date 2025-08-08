<script lang="ts">
	import Banner from "$components/Banner.svelte";
	import Title from "$components/Title.svelte";
	import type { Tables } from "$lib/models";
	import { formatDate } from "$lib/utilities";

	let { data }: { data: { events: Tables<"community_events">[] } } = $props();

	const sortedEvents = $derived(() => {
		return data.events.toSorted((a, b) => {
			return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
		});
	});
</script>

<Title title="Event Management" />

<Banner title="Manage ITea Lab events" />

<section>
	<table>
		<thead>
			<tr>
				<th scope="col" id="cTitle">Title</th>
				<th scope="col" id="cCategory">Category</th>
				<th scope="col" id="cDescription">Description</th>
				<th scope="col" id="cStartTime">Start Time</th>
				<th scope="col" id="cEndTime">End Time</th>
				<th scope="col" id="cLocation">Location</th>
				<th scope="col" id="cAction">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedEvents() as event}
				<tr>
					<td headers="cTitle">{event.title}</td>
					<td headers="cCategory">{event.category}</td>
					<td headers="cDescription">{event.description}</td>
					<td headers="cStartTime">{formatDate(event.start_time)}</td>
					<td headers="cEndTime">{formatDate(event.end_time)}</td>
					<td headers="cLocation">{event.location}</td>
					<td headers="cAction">{@render actionButtons(event.id)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="8"><strong>{sortedEvents().length} events</strong></td>
			</tr>
		</tfoot>
	</table>
</section>

{#snippet actionButtons(eventID: string)}
	<button><span class="material-symbols-rounded" aria-label="Edit">edit</span></button>
	<button><span class="material-symbols-rounded" aria-label="Delete">delete</span></button>
{/snippet}

<style>
	section {
		margin-inline: 1rem;
		overflow-x: scroll;
	}

	table {
		width: max-content;
		margin: auto;
		border-collapse: collapse;
	}

	tr:nth-child(even) {
		background-color: #aaa3;
	}

	th, td {
		padding: 0.5rem;
		text-align: left;
	}

	thead, tfoot {
		color: var(--foreground);
		background-color: var(--green);
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
	}

	table button {
		padding: 0;
		background: none;
		cursor: pointer;
	}
</style>
