<script lang="ts">
	import supabase from "$lib/supabase";
	import { type Database } from "$lib/models";
	import { goto } from "$app/navigation";

	let { eventID = "" } = $props();

	let form = {
		name: "",
		email: "",
		year: "" as Database["public"]["Enums"]["academic_year"] | "",
		field: "" as Database["public"]["Enums"]["field_of_study"] | "",
		major: "",
		confirm: false,
	};

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (form.year === "" || form.field === "" || form.major === "") {
			alert("Please fill out all required fields.");
			return;
		}

		const { data, error } = await supabase.rpc("create_event_ticket", {
			p_event_id: eventID,
			p_name: form.name,
			p_email: form.email,
			p_academic_year: form.year,
			p_field_of_study: form.field,
			p_major: form.major,
			p_participate: form.confirm,
		});

		if (error) {
			console.error("Error creating event ticket:", error);
			return;
		}

		goto(`/tickets/${data}`);
	}
</script>

<form onsubmit={handleSubmit}>
	<label for="ff-name">Full name</label>
	<input id="ff-name" type="text" required bind:value={form.name} />

	<label for="ff-mail">Email address</label>
	<input id="ff-mail" type="email" required bind:value={form.email} />

	<label for="ff-year">Academic Year</label>
	<select id="ff-year" required bind:value={form.year}>
		<option value="" disabled selected>Select Academic Year</option>
		<option value="Freshman">Freshman</option>
		<option value="Sophomore">Sophomore</option>
		<option value="Junior">Junior</option>
		<option value="Senior">Senior</option>
	</select>

	<label for="ff-field">Field of Study</label>
	<select id="ff-field" required bind:value={form.field}>
		<option value="" disabled selected>Select Field of Study</option>
		<option value="business">Business</option>
		<option value="comp-sci">Computer Science</option>
		<option value="mediacom">Media and Communication</option>
	</select>

	<label for="ff-major">Major</label>
	<select id="ff-major" required bind:value={form.major}>
		<option value="" disabled selected>Select Major</option>
		<option value="DS">Data Science</option>
		<option value="SD">Software Development</option>
		<option value="AI">AI</option>
		<option value="IoT">IoT</option>
		<option value="CyS">Cyber Security</option>
	</select>

	<p>
		<input
			id="ff-confm"
			type="checkbox"
			required
			bind:checked={form.confirm}
		/>
		<label for="ff-confm">
			<small>By filling out this form, you agree to participate</small>
		</label>
	</p>

	<button type="submit">Submit</button>
</form>

<style>
	form {
		margin-top: 0.5rem;
	}

	input[type="text"],
	input[type="email"],
	select {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		background-color: transparent;
		border: 2px solid var(--foreground);
		border-radius: 0.5rem;
	}

	label {
		display: inline-block;
		margin-bottom: 0.3rem;
	}

	button {
		background-color: var(--dark-green);
		color: var(--green);
	}
</style>
