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
	<div class="image" style="--src: url(https://placehold.co/160x90)"></div>
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
		border: 2px solid var(--foreground);
		border-radius: 1rem;
	}

	.event .image {
		width: 100%;
		height: 100%;
		aspect-ratio: 16 / 9;
		border-radius: 1rem 0 0 1rem;
		background-image: var(--src);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
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
			border-radius: 1rem 1rem 0 0;
		}

		.event .register {
			padding-top: 0;
		}
	}
</style>
