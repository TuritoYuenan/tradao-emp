<script lang="ts">
	import Banner from "$components/Banner.svelte";
	import Title from "$components/Title.svelte";
	import type { Tables } from "$lib/models";

	let {
		data,
	}: {
		data: {
			lookup: Tables<"tickets_with_event_details">;
			saveURL: string;
		};
	} = $props();
</script>

<Title title={"Your ticket for " + data.lookup.event_title} />

<Banner title="Here is your event ticket!" />

<div>
	<article>
		<h2>{data.lookup.event_title}</h2>
		<hr />
		<dl>
			<dt>Name</dt>
			<dd>{data.lookup.name}</dd>
			<dt>Email</dt>
			<dd>{data.lookup.email}</dd>
			<dt>Academic Year</dt>
			<dd>{data.lookup.academic_year}</dd>
			<dt>Field of Study</dt>
			<dd>{data.lookup.field_of_study}</dd>
			<dt>Major</dt>
			<dd>{data.lookup.major}</dd>
			<dt>Participating</dt>
			<dd>{data.lookup.participate ? "Yes" : "No"}</dd>
			<dt>Created At</dt>
			<dd>{data.lookup.created_at}</dd>
		</dl>
		<hr />
		<section id="footer">
			<a href={data.saveURL} id="save-button">
				<img
					src="/enAU_add_to_google_wallet_add-wallet-badge.svg"
					alt="Add to Google Wallet"
				/>
			</a>
			<p>{data.lookup.ticket_id}</p>
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
