<script lang="ts">
	import Banner from "$components/Banner.svelte";
	import PageMetadata from "$components/PageMetadata.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<PageMetadata title="Manage Events" />
<Banner title="Manage Events" />

<div class="grid">
	{#each data.events as event}
		{@render EventCard(event)}
	{/each}
</div>

{#snippet EventCard(event: PageProps["data"]["events"][0])}
	<article class="card s12 m6">
		<h2 class="small">{event.title}</h2>
		<p>{event.description}</p>
		<p>
			<strong>Start Time:</strong>
			{new Date(event.start_time).toLocaleString()}
		</p>
		<p>
			<strong>End Time:</strong>
			{new Date(event.end_time).toLocaleString()}
		</p>

		<nav class="right-align">
			<button type="button"><i>edit</i> Edit</button>
			<button type="button"><i>delete</i> Delete</button>
		</nav>
	</article>
{/snippet}
