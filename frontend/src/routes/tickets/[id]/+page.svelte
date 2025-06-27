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
		<img id="bg-img" src="/icon-lab.svg" alt="Event logo" />
		<h2>{data.ticket.event_id}</h2>
		<hr />
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
		<hr />
		<section id="footer">
			<a href={data.saveURL} id="save-button">
				<img src="/enAU_add_to_google_wallet_add-wallet-badge.svg" alt="Add to Google Wallet" />
			</a>
		</section>
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
		position: relative;
	}

	article img#bg-img {
		width: 20rem;
		position: absolute;
		z-index: -1;
		left: 50%;
		top: 50%;
		opacity: 0.5;
		aspect-ratio: 1 / 1;
		transform: translate(-50%, -50%);
	}

	article h2 {
		text-align: center;
	}

	article hr {
		margin-block: 1rem;
		border: 1px solid var(--foreground);
		border-radius: 1rem;
	}

	article section#footer {
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
