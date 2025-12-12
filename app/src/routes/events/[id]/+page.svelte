<script lang="ts">
	import PageMetadata from '$components/PageMetadata.svelte';
	import EventRegistrationForm from '$components/EventRegistrationForm.svelte';
	import { formatDate, isEventUpcoming } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let event = $derived(data.event);
</script>

<PageMetadata
	title={event.title}
	description={event.description}
	keywords={`ITea Lab, Tradao, Event, ${event.title}, ${event.category}, Technology, Innovation, Community, Vietnam`}
/>

<div class="grid-base" id="event-details-page">
	<article class="border no-padding" data-g-area="image">
		<img src={event.image} alt="" class="responsive" />
	</article>

	<article class="border" data-g-area="head">
		<div class="row wrap">
			<p class="chip">{event.category}</p>
		</div>
		<h1 class="small">{event.title}</h1>
	</article>

	<article class="border" data-g-area="form">
		<h2 class="small">Participate in this event</h2>
		{#if isEventUpcoming(event.start_time)}
			<EventRegistrationForm eventID={event.id} />
		{:else}
			<p class="mt-4">This event has ended. Registration is closed.</p>
		{/if}
	</article>

	<article class="border" data-g-area="time">
		<h2 class="small">Event Time</h2>
		<p>
			<i>event</i> <strong>Start:</strong> {formatDate(event.start_time)}
		</p>
		<p>
			<i>event</i> <strong>End:</strong> {formatDate(event.end_time)}
		</p>
	</article>

	<article class="border" data-g-area="host">
		<h2 class="small">Event Host</h2>
		<p>{event.host}</p>
	</article>

	<article class="border" data-g-area="loct">
		<h2 class="small">Event Location</h2>
		<p>{event.location}</p>
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d538.0976707808976!2d106.6689481567678!3d10.816110200767868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752931fede9f91%3A0x1fe04aae50f65b1f!2zU3dpbmJ1cm5lIFZp4buHdCBOYW0gLSBDxqEgc-G7nyBUUCBIQ00!5e1!3m2!1sen!2sau!4v1750058710892!5m2!1sen!2sau"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			title="Event Location Map"
			class="responsive"
		></iframe>
	</article>

	<article class="border" data-g-area="text">
		<p>{event.description}</p>
	</article>
</div>

<style>
	iframe {
		aspect-ratio: 1;
	}

	[data-g-area] {
		grid-area: attr(data-g-area);
	}

	[data-g-area='form'] {
		overflow-y: scroll;
	}
</style>
