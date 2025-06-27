<script lang="ts">
	import { type Tables } from "$lib/models";
	import RegForm from "$components/RegForm.svelte";
	import Title from "$components/Title.svelte";
	import { formatDate } from "$lib/utilities";

	let { data }: { data: { event: Tables<"community_events"> } } = $props();
</script>

<Title title={data.event.title} />

<article id="details">
	<div id="image" style="--src: url({data.event.image})"></div>

	<div id="head">
		<p>{data.event.category}</p>
		<h1>{data.event.title}</h1>
	</div>

	<div id="text">
		<p>{data.event.description}</p>
	</div>

	<div id="time">
		<h2>Event Time</h2>
		<p>
			<span class="material-symbols-rounded">event</span>
			<strong>Start:</strong>
			{formatDate(data.event.start_time)}
		</p>
		<p>
			<span class="material-symbols-rounded">event</span>
			<strong>End:</strong>
			{formatDate(data.event.end_time)}
		</p>
	</div>

	<div id="host">
		<h2>Event Host</h2>
		<p>{data.event.host}</p>
		<p>104993913@student.swin.edu.au</p>
	</div>

	<div id="loct">
		<h2>Event Location</h2>
		<p>{data.event.location}</p>
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d538.0976707808976!2d106.6689481567678!3d10.816110200767868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752931fede9f91%3A0x1fe04aae50f65b1f!2zU3dpbmJ1cm5lIFZp4buHdCBOYW0gLSBDxqEgc-G7nyBUUCBIQ00!5e1!3m2!1sen!2sau!4v1750058710892!5m2!1sen!2sau"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			title="Event Location Map"
		></iframe>
	</div>

	<div id="form">
		<h2>Participate in this event</h2>
		<RegForm eventID={data.event.id} />
	</div>
</article>

<style>
	#details {
		margin: 1rem;
		display: grid;
		gap: 1rem;
		grid-template-areas:
			"image image loct"
			"head head form"
			"time host form"
			"text text form";
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto auto auto 1fr;
	}

	#details > * {
		border: 2px solid var(--foreground);
		border-radius: 1rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
	}

	#details :where(#head, #text, #time, #host, #loct, #form) {
		padding: 1rem;
	}

	#details #image {
		grid-area: image;
		display: block;
		border-radius: 1rem;
		aspect-ratio: 16 / 9;
		background: var(--src) no-repeat center center;
		background-size: cover;
	}

	#details #head {
		grid-area: head;
	}

	#details #text {
		grid-area: text;
	}

	#details #time {
		grid-area: time;
	}

	#details #host {
		grid-area: host;
	}

	#details #loct {
		grid-area: loct;
	}

	#details #loct iframe {
		width: 100%;
		height: auto;
		margin-top: 1rem;
		aspect-ratio: 10 / 8.5;
		border: none;
		border-radius: 1rem;
	}

	#details #form {
		grid-area: form;
	}

	@media (width < 768px) {
		#details {
			display: flex;
			flex-direction: column;
		}
	}
</style>
