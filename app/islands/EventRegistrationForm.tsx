import { useState } from 'preact/hooks';
import { Constants } from '$lib/models.ts';

export function EventRegistrationForm({ eventID }: { eventID: string }) {
	const [isRegistering, setIsRegistering] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	async function handleFormSubmission(e: Event) {
		setIsRegistering(true);
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		formData.append('eventID', eventID);

		const response = await fetch('/api/tickets', {
			method: 'POST',
			body: formData,
		});

		switch (response.status) {
			case 400: {
				// 4xx errors
				const data = await response.json();
				setErrors(data.errors);
				setIsRegistering(false);
				break;
			}

			case 500: {
				// 5xx errors
				setErrors(['Something went wrong on our end. Please try again later.']);
				setIsRegistering(false);
				break;
			}

			case 200: {
				// ticketID
				const data = await response.json();
				const ticketID = data.ticketID;
				globalThis.location.href = `/tickets/${ticketID}`;
				break;
			}

			default: {
				// Unexpected status code
				setErrors(['Unexpected error. Please try again later.']);
			}
		}
	}

	return (
		<form
			method='POST'
			className='mt-2'
			onSubmit={handleFormSubmission}
			noValidate
		>
			<datalist id='majors'>
				<option value='Data Science'>Data Science</option>
				<option value='Software Development'>Software Development</option>
				<option value='Artificial Intelligence'>Artificial Intelligence</option>
				<option value='Internet of Things'>Internet of Things</option>
				<option value='Cyber Security'>Cyber Security</option>
			</datalist>

			<label htmlFor='ff-name' className='inline-block mb-1'>Full name</label>
			<input
				id='ff-name'
				name='name'
				type='text'
				placeholder='e.g. Nguyen Ta Minh Triet'
				className='w-full p-2 mb-2 bg-transparent border-2 border-[var(--foreground)] rounded-lg text-inherit'
				required
			/>

			<label htmlFor='ff-mail' className='inline-block mb-1'>
				Email address
			</label>
			<input
				id='ff-mail'
				name='email'
				type='email'
				placeholder='e.g. 123456789@student.swin.edu.au'
				className='w-full p-2 mb-2 bg-transparent border-2 border-[var(--foreground)] rounded-lg text-inherit'
				required
			/>

			<label htmlFor='ff-year' className='inline-block mb-1'>
				Academic Year
			</label>
			<select
				id='ff-year'
				name='year'
				className='w-full p-2 mb-2 bg-transparent border-2 border-[var(--foreground)] rounded-lg'
				required
			>
				<option value=''>Select Academic Year</option>
				{Constants.public.Enums.academic_year.map((year) => <option value={year} key={year}>{year}</option>)}
			</select>

			<label htmlFor='ff-field' className='inline-block mb-1'>
				Field of Study
			</label>
			<select
				id='ff-field'
				name='field'
				className='w-full p-2 mb-2 bg-transparent border-2 border-[var(--foreground)] rounded-lg'
				required
			>
				<option value=''>Select Field of Study</option>
				{Constants.public.Enums.field_of_study.map((field) => <option value={field} key={field}>{field}
				</option>)}
			</select>

			<label htmlFor='ff-major' className='inline-block mb-1'>Major</label>
			<input
				id='ff-major'
				name='major'
				type='text'
				list='majors'
				placeholder='e.g. Data Science'
				className='w-full p-2 mb-2 bg-transparent border-2 border-[var(--foreground)] rounded-lg text-inherit'
				required
			/>

			<p>
				<input
					id='ff-confm'
					name='confirm'
					type='checkbox'
					required
				/>{' '}
				<label htmlFor='ff-confm'>
					<small>By filling out this form, you agree to participate</small>
				</label>
			</p>

			{errors.length > 0 && (
				<section id='errors'>
					<h2 className='text-red-500'>
						Oops! There were some problems with registering!
					</h2>
					<ul className='list-disc list-inside text-red-500'>
						{errors.map((error, index) => <li key={index}>{error}</li>)}
					</ul>
				</section>
			)}

			<button type='submit' className='button' disabled={isRegistering}>
				Submit
			</button>
		</form>
	);
}
