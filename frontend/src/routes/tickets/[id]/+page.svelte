<script lang="ts">
	import Banner from "$components/Banner.svelte";
	import Title from "$components/Title.svelte";
	import type { Tables } from "$lib/models";

	let {
		data,
	}: { data: { ticket: Tables<"event_tickets">; saveURL: string } } =
		$props();
</script>

<Title title={"Your ticket for " + data.ticket.event_id} />

<Banner title="Here is your event ticket!" />

<div>
	<article>
		<h2>{data.ticket.event_id}</h2>
		<dl>
			<dt>Name</dt>
			<dd>{data.ticket.name}</dd>
			<dt>Email</dt>
			<dd>{data.ticket.email}</dd>
			<dt>Academic Year</dt>
			<dd>{data.ticket.academic_year}</dd>
			<dt>Field of Study</dt>
			<dd>{data.ticket.field_of_study}</dd>
			<dt>Major</dt>
			<dd>{data.ticket.major}</dd>
			<dt>Participating</dt>
			<dd>{data.ticket.participate ? "Yes" : "No"}</dd>
			<dt>Ticket ID</dt>
			<dd>{data.ticket.id}</dd>
			<dt>Created At</dt>
			<dd>{data.ticket.created_at}</dd>
		</dl>
	</article>
</div>

<style>
	div {
		padding: 1rem;
	}

	article {
		max-width: 90ch;
		margin: auto;
		padding: 1rem;
		border: 2px solid var(--foreground);
		border-radius: 1rem;
	}

	article h2 {
		text-align: center;
	}

	dl {
		display: grid;
		gap: 0.5rem 1rem;
		grid-template-columns: auto auto;
	}

	dt {
		font-weight: bold;
		text-align: end;
	}

	dd {
		margin: 0;
	}
</style>
