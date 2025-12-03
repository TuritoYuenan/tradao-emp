import { useSignal } from '@preact/signals';

// MARK: Step 1
const Step1 = () => (
	<fieldset>
		<legend>Step 1: The Basics</legend>

		<div className='field label border prefix'>
			<i>title</i>
			<input type='text' id='title' name='title' required />
			<label htmlFor='title'>Title</label>
		</div>

		<div className='field label border prefix'>
			<i>event</i>
			<input type='datetime-local' id='start_time' name='start_time' required />
			<label htmlFor='start_time'>Start Time</label>
		</div>

		<div className='field label border prefix'>
			<i>event</i>
			<input type='datetime-local' id='end_time' name='end_time' required />
			<label htmlFor='end_time'>End Time</label>
		</div>

		<div className='field label border prefix'>
			<i>location_on</i>
			<input type='text' id='location' name='location' required />
			<label htmlFor='location'>Location</label>
			<span className='helper'>
				Can simply be room name, which defaults to Swinburne A35 building
			</span>
		</div>
	</fieldset>
);

// MARK: Step 2
const Step2 = () => (
	<fieldset>
		<legend>Step 2: Host</legend>

		<div className='field label border prefix'>
			<i>badge</i>
			<input type='text' id='host_name' name='host_name' required />
			<label htmlFor='host_name'>Host Name</label>
		</div>

		<div className='field label border prefix'>
			<i>mail</i>
			<input type='email' id='host_email' name='host_email' required />
			<label htmlFor='host_email'>Contact Email</label>
		</div>
	</fieldset>
);

// MARK: Step 3
const Step3 = () => (
	<fieldset>
		<legend>Step 3: Description</legend>

		<div className='field label border prefix'>
			<i>category</i>
			<select id='category' name='category' required>
				<option value=''>Select a category</option>
				<option value='conference'>Conference</option>
				<option value='meetup'>Meetup</option>
				<option value='pitching'>Pitching</option>
				<option value='workshop'>Workshop</option>
			</select>
			<label htmlFor='category'>Category</label>
		</div>

		<div className='field textarea label border'>
			<textarea id='description' name='description' />
			<label htmlFor='description'>Event Description</label>
		</div>

		<button type='button'>
			<i>image</i>
			<span>Image Thumbnail</span>
			<input
				type='file'
				id='image'
				name='imageFile'
				accept='image/png,image/jpeg,image/webp'
				required
			/>
		</button>
	</fieldset>
);

// MARK: Main Component
export function EventCreationForm() {
	const isSubmitting = useSignal(false);
	const errors = useSignal<string[]>([]);

	async function handleSubmission(event: Event) {
		isSubmitting.value = true;
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form).entries());

		const response = await fetch('/api/events', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		});

		switch (response.status) {
			case 400: {
				// 4xx errors
				const data = await response.json();
				errors.value = data.errors;
				isSubmitting.value = false;
				break;
			}

			case 500: {
				// 5xx errors
				errors.value = ['Something went wrong on our end. Please try again later.'];
				isSubmitting.value = false;
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
				errors.value = ['Unexpected error. Please try again later.'];
				break;
		}
	}

	return (
		<form method='POST' noValidate onSubmit={handleSubmission}>
			<Step1 />
			<Step2 />
			<Step3 />

			{errors.value.length > 0 && (
				<section className='error'>
					<h2>
						Oops! There were some problems with registering!
					</h2>
					<ul>
						{errors.value.map((error, index) => <li key={index}>{error}</li>)}
					</ul>
				</section>
			)}

			<div className='medium-space'></div>
			<button type='submit' className='responsive' disabled={isSubmitting}>
				Create Event
			</button>
		</form>
	);
}
