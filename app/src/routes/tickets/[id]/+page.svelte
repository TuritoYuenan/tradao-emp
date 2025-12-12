<script lang="ts">
	import PageMetadata from "$components/PageMetadata.svelte";
	import Banner from "$components/Banner.svelte";
	import { formatDate } from "$lib/utils";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	const ticket = $derived(data.ticket);
	const saveURL = $derived(data.saveURL);
</script>

<PageMetadata
	title="Your Event Ticket"
	description="Here is your event ticket from ITea Lab & Tradao"
	keywords="ITea Lab, Tradao, Event Ticket, Ticket, Technology, Innovation, Community, Vietnam"
/>

<Banner title="Here is your event ticket!" />

<article class="center-align" style="max-width: 90ch; margin: auto;">
	{@render TicketHeader()}
	<hr class="large" />
	{@render TicketDetails()}
	<hr class="large" />
	{@render TicketFooter()}
</article>

{#snippet TicketHeader()}
	<h2 class="small">{ticket.event_title}</h2>
{/snippet}

{#snippet TicketDetails()}
	<dl class="grid left-align">
		<dt class="s6 right-align">
			<strong>Name</strong>
		</dt>
		<dd class="s6 left-align">{ticket.name}</dd>
		<dt class="s6 right-align">
			<strong>Email</strong>
		</dt>
		<dd class="s6 left-align">{ticket.email}</dd>
		<dt class="s6 right-align">
			<strong>Academic Year</strong>
		</dt>
		<dd class="s6 left-align">{ticket.academic_year}</dd>
		<dt class="s6 right-align">
			<strong>Field of Study</strong>
		</dt>
		<dd class="s6 left-align">{ticket.field_of_study}</dd>
		<dt class="s6 right-align">
			<strong>Major</strong>
		</dt>
		<dd class="s6 left-align">{ticket.major}</dd>
		<dt class="s6 right-align">
			<strong>Participating</strong>
		</dt>
		<dd class="s6 left-align">{ticket.participate ? "Yes" : "No"}</dd>
		<dt class="s6 right-align">
			<strong>Created At</strong>
		</dt>
		<dd class="s6 left-align">{formatDate(ticket.created_at!)}</dd>
	</dl>
{/snippet}

{#snippet TicketFooter()}
	<section id="footer">
		<a href={saveURL} target="_blank" rel="noopener noreferrer">
			<img
				src="/buttons/enAU_add_to_google_wallet_add-wallet-badge.svg"
				alt="Add to Google Wallet"
			/>
		</a>
		<p>{ticket.ticket_id}</p>
	</section>
{/snippet}
