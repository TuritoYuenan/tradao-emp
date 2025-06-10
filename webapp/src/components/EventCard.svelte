<script lang="ts">
	import type { Tables } from "$lib/models";

	let { event }: { event: Tables<"community_events"> } = $props();

	function formatDate(date: string): string {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		};
		return new Date(date).toLocaleString("en-AU", options);
	}
</script>

<div class="event">
	<img class="image" src="https://placehold.co/200x144" alt="Event" />
	<div class="details">
		<h2>{event.name}</h2>
		<p>
			<span class="material-symbols-rounded">event</span>
			<strong>Date:</strong>
			{formatDate(event.start_time)} &ndash;
			{formatDate(event.end_time)}
		</p>
		<p>
			<span class="material-symbols-rounded">location_on</span>
			<strong>Location:</strong>
			{event.location}
		</p>
	</div>
	<div class="register">
		<a class="cta" href="/event/{event.id}">Register</a>
	</div>
</div>

<style>
	.event {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 3fr auto;
		border: 1px solid var(--dark-green);
	}

	.event .image {
		width: 100%;
		height: 100%;
	}

	.event :where(.details, .register) {
		padding: 1rem;
	}

	/* Medium screen layout */
	@media (width <= 900px) and (width > 600px) {
		.event {
			grid-template-columns: 1fr 2fr;
			grid-template-rows: auto auto;
			grid-template-areas: "image details" "image register";
		}
		.event .image {
			grid-area: image;
		}
		.event .details {
			grid-area: details;
		}
		.event .register {
			grid-area: register;
			align-self: start;
		}
	}

	@media (width <= 600px) {
		.event {
			grid-template-columns: 1fr;
		}

		.event .image {
			width: 100%;
			height: auto;
		}

		.event .register {
			padding-top: 0;
		}
	}
</style>
