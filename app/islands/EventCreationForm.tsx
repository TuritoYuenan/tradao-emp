import { useState } from 'preact/hooks';

// MARK: Step 1
function Step1() {
	return (
		<fieldset className='mb-4'>
			<legend className='mb-2 text-2xl font-bold'>Step 1: The Basics</legend>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				<div className='flex flex-col md:col-span-2'>
					<label htmlFor='title' className='font-semibold mb-1'>Title</label>
					<input
						type='text'
						id='title'
						name='title'
						className='p-2 border-2 border-[var(--foreground)] rounded-lg'
						required
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='start_time' className='font-semibold mb-1'>Start Time</label>
					<input
						type='datetime-local'
						id='start_time'
						name='start_time'
						className='p-2 border-2 border-[var(--foreground)] rounded-lg'
						required
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='end_time' className='font-semibold mb-1'>End Time</label>
					<input
						type='datetime-local'
						id='end_time'
						name='end_time'
						className='p-2 border-2 border-[var(--foreground)] rounded-lg'
						required
					/>
				</div>
				<div className='flex flex-col md:col-span-2'>
					<label htmlFor='location' className='font-semibold mb-1'>Location</label>
					<input
						type='text'
						id='location'
						name='location'
						className='p-2 border-2 border-[var(--foreground)] rounded-lg'
						required
					/>
					<small>Can simply be room name, which defaults to Swinburne A35 building</small>
				</div>
			</div>
		</fieldset>
	);
}

// MARK: Step 2
function Step2() {
	return (
		<fieldset className='mb-4'>
			<legend className='mb-2 text-2xl font-bold'>Step 2: Host</legend>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				<div className='flex flex-col'>
					<label htmlFor='host_name' className='font-semibold mb-1'>Host Name</label>
					<input
						type='text'
						id='host_name'
						name='host_name'
						className='p-2 border-2 border-[var(--foreground)] rounded-lg'
						required
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='host_email' className='font-semibold mb-1'>Contact Email</label>
					<input
						type='email'
						id='host_email'
						name='host_email'
						className='p-2 border-2 border-[var(--foreground)] rounded-lg'
						required
					/>
				</div>
			</div>
		</fieldset>
	);
}

// MARK: Step 3
function Step3() {
	return (
		<fieldset className='mb-4'>
			<legend className='mb-2 text-2xl font-bold'>Step 3: Description</legend>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				<div className='flex flex-col'>
					<label htmlFor='category' className='font-semibold mb-1'>Category</label>
					<select
						id='category'
						name='category'
						className='h-full p-2 border-2 border-[var(--foreground)] bg-white rounded-lg'
						required
					>
						<option value=''>Select a category</option>
						<option value='conference'>Conference</option>
						<option value='meetup'>Meetup</option>
						<option value='pitching'>Pitching</option>
						<option value='workshop'>Workshop</option>
					</select>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='image' className='font-semibold mb-1'>Thumbnail Image</label>
					<input
						type='file'
						id='image'
						name='imageFile'
						accept='image/png,image/jpeg,image/webp'
						className='
							p-1 border-2 border-[var(--foreground)] bg-white
							rounded-lg file:border-0 file:bg-[var(--green)]
							file:text-[var(--foreground)] file:px-4 file:py-2
							file:rounded-md'
						required
					/>
				</div>
				<div className='flex flex-col md:col-span-2'>
					<label htmlFor='description' className='font-semibold mb-1'>Event Description</label>
					<textarea
						id='description'
						name='description'
						className='p-2 border-2 border-[var(--foreground)] rounded-lg h-40'
					/>
				</div>
			</div>
		</fieldset>
	);
}

// MARK: Main Component
export default function EventCreationForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	async function handleSubmission(event: Event) {
		setIsSubmitting(true);
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const response = await fetch('/api/events', { method: 'POST', body: formData });

		switch (response.status) {
			case 400: {
				// 4xx errors
				const data = await response.json();
				setErrors(data.errors);
				setIsSubmitting(false);
				break;
			}

			case 500: {
				// 5xx errors
				setErrors(['Something went wrong on our end. Please try again later.']);
				setIsSubmitting(false);
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
				setErrors(['Unexpected error. Please try again later.']);
				break;
		}
	}

	return (
		<form
			method='POST'
			noValidate
			onSubmit={handleSubmission}
			className='max-w-3xl mx-auto p-4 md:shadow-lg md:border-2 border-[var(--foreground)] rounded-lg'
		>
			<Step1 />
			<Step2 />
			<Step3 />

			{errors.length > 0 && (
				<section id='errors'>
					<h2 className='text-red-500'>Oops! There were some problems with registering!</h2>
					<ul className='list-disc list-inside text-red-500'>
						{errors.map((error, index) => <li key={index}>{error}</li>)}
					</ul>
				</section>
			)}

			<fieldset>
				<button type='submit' className='button' disabled={isSubmitting}>Create Event</button>
			</fieldset>
		</form>
	);
}
