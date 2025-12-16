<script lang="ts">
	let isSubmitting = $state(false);
	let errors = $state<string[]>([]);

	async function handleSubmission(event: Event) {
		isSubmitting = true;
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form).entries());

		const response = await fetch("/api/events", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		});

		switch (response.status) {
			case 400: {
				// 4xx errors
				const data = await response.json();
				errors = data.errors;
				isSubmitting = false;
				break;
			}

			case 500: {
				// 5xx errors
				errors = [
					"Something went wrong on our end. Please try again later.",
				];
				isSubmitting = false;
				break;
			}

			case 200: {
				// eventID
				const data = await response.json();
				const eventID = data.event.id;
				globalThis.location.href = `/events/${eventID}`;
				break;
			}

			default:
				// Unexpected status code
				errors = ["Unexpected error. Please try again later."];
				break;
		}
	}
</script>

<form method="POST" noValidate onsubmit={handleSubmission}>
	{@render Step1()}
	{@render Step2()}
	{@render Step3()}

	{#if errors.length > 0}
		<section class="error">
			<h2>Oops! There were some problems with registering!</h2>
			<ul>
				{#each errors as error}
					<li>{error}</li>
				{/each}
			</ul>
		</section>
	{/if}

	<div class="medium-space"></div>
	<button type="submit" class="responsive" disabled={isSubmitting}>
		Create Event
	</button>
</form>

{#snippet Step1()}
	<fieldset>
		<legend>Step 1: The Basics</legend>

		<div class="field label border prefix">
			<i>title</i>
			<input type="text" id="title" name="title" required />
			<label for="title">Title</label>
		</div>

		<div class="field label border prefix">
			<i>event</i>
			<input
				type="datetime-local"
				id="start_time"
				name="start_time"
				required
			/>
			<label for="start_time">Start Time</label>
		</div>

		<div class="field label border prefix">
			<i>event</i>
			<input
				type="datetime-local"
				id="end_time"
				name="end_time"
				required
			/>
			<label for="end_time">End Time</label>
		</div>

		<div class="field label border prefix">
			<i>location_on</i>
			<input type="text" id="location" name="location" required />
			<label for="location">Location</label>
			<span class="helper">
				Can simply be room name, which defaults to Swinburne A35
				building
			</span>
		</div>
	</fieldset>
{/snippet}

{#snippet Step2()}
	<fieldset>
		<legend>Step 2: Host</legend>

		<div class="field label border prefix">
			<i>badge</i>
			<input type="text" id="host_name" name="host_name" required />
			<label for="host_name">Host Name</label>
		</div>

		<div class="field label border prefix">
			<i>mail</i>
			<input type="email" id="host_email" name="host_email" required />
			<label for="host_email">Contact Email</label>
		</div>
	</fieldset>
{/snippet}

{#snippet Step3()}
	<fieldset>
		<legend>Step 3: Description</legend>

		<div class="field label border prefix">
			<i>category</i>
			<select id="category" name="category" required>
				<option value="">Select a category</option>
				<option value="conference">Conference</option>
				<option value="meetup">Meetup</option>
				<option value="pitching">Pitching</option>
				<option value="workshop">Workshop</option>
			</select>
			<label for="category">Category</label>
		</div>

		<div class="field textarea label border">
			<textarea id="description" name="description"></textarea>
			<label for="description">Event Description</label>
		</div>

		<button type="button">
			<i>image</i>
			<span>Image Thumbnail</span>
			<input
				type="file"
				id="image"
				name="imageFile"
				accept="image/png,image/jpeg,image/webp"
				required
			/>
		</button>
	</fieldset>
{/snippet}
