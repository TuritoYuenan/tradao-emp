<form>
	<input id="ff-name" type="text" placeholder="Your Name" required />
	<input id="ff-mail" type="email" placeholder="Your Email" required />

	<select id="ff-year" required>
		<option value="" disabled selected>Select Academic Year</option>
		<option value="Freshman">Freshman</option>
		<option value="Sophomore">Sophomore</option>
		<option value="Junior">Junior</option>
		<option value="Senior">Senior</option>
	</select>

	<select id="ff-field" required>
		<option value="" disabled selected>Select Field of Study</option>
		<option value="business">Business</option>
		<option value="comp-sci">Computer Science</option>
		<option value="mediacom">Media and Communication</option>
	</select>

	<select id="ff-major" required>
		<option value="" disabled selected>Select Major</option>
		<option value="DS">Data Science</option>
		<option value="SD">Software Development</option>
		<option value="AI">AI</option>
		<option value="IoT">IoT</option>
		<option value="CyS">Cyber Security</option>
	</select>

	<p>
		<input id="ff-confm" type="checkbox" required />
		<label for="ff-confm">
			<small>By filling out this form, you agree to participate</small>
		</label>
	</p>
	<button type="submit">Submit</button>
</form>

<style>
	input[type="text"],
	input[type="email"],
	select {
		width: 100%;
		padding: 0.5rem;
		margin-top: 1rem;
		background-color: transparent;
		border: 2px solid var(--foreground);
		border-radius: 0.5rem;
	}

	button {
		background-color: var(--dark-green);
		color: var(--green);
	}
</style>
