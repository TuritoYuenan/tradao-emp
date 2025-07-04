<script lang="ts">
	import supabase from "$lib/supabase";
	import { type Database } from "$lib/models";
	import { goto } from "$app/navigation";

	let { eventID = "" } = $props();

	/**
	 * Registration form fields to collect
	 */
	let form = $state({
		name: "",
		email: "",
		year: "" as Database["public"]["Enums"]["academic_year"] | "",
		field: "" as Database["public"]["Enums"]["field_of_study"] | "",
		major: "",
		confirm: false,
	});

	/**
	 * Handles registering an event
	 * @param event The form submission event
	 */
	async function handleRegistration(event: Event) {
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

<form onsubmit={handleRegistration}>
	<label for="ff-name">Full name</label>
	<input
		id="ff-name"
		type="text"
		required
		bind:value={form.name}
		placeholder=""
	/>

	<label for="ff-mail">Email address</label>
	<input
		id="ff-mail"
		type="email"
		required
		bind:value={form.email}
		placeholder=""
	/>

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
	<input
		id="ff-major"
		type="text"
		required
		bind:value={form.major}
		list="mjs"
		placeholder="e.g. Data Science"
	/>

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

<datalist id="mjs">
	<option value="Data Science">Data Science</option>
	<option value="Software Development">Software Development</option>
	<option value="Artificial Intelligence">Artificial Intelligence</option>
	<option value="Internet of Things">Internet of Things</option>
	<option value="Cyber Security">Cyber Security</option>
</datalist>

<style>
	form {
		margin-top: 0.5rem;
	}

	input {
		color: inherit;
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
