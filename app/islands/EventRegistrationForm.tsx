import { useSignal } from '@preact/signals';
import { Constants } from '$lib/models.ts';

export function EventRegistrationForm({ eventID }: { eventID: string }) {
	const isRegistering = useSignal(false);
	const errors = useSignal<string[]>([]);

	async function handleFormSubmission(e: Event) {
		isRegistering.value = true;
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
				errors.value = data.error;
				isRegistering.value = false;
				break;
			}

			case 500: {
				// 5xx errors
				errors.value = ['Something went wrong on our end. Please try again later.'];
				isRegistering.value = false;
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
				errors.value = ['Unexpected error. Please try again later.'];
			}
		}
	}

	return (
		<form method='POST' className='mt-2' onSubmit={handleFormSubmission} noValidate>
			<datalist id='majors'>
				<option value='Data Science'>Data Science</option>
				<option value='Software Development'>Software Development</option>
				<option value='Artificial Intelligence'>Artificial Intelligence</option>
				<option value='Internet of Things'>Internet of Things</option>
				<option value='Cyber Security'>Cyber Security</option>
			</datalist>

			<div className='field label border'>
				<input id='ff-name' name='name' type='text' required />
				<label htmlFor='ff-name'>Full name</label>
			</div>

			<div className='field label border'>
				<input id='ff-mail' name='email' type='email' required />
				<label htmlFor='ff-mail'>Email address</label>
			</div>

			<div className='field border suffix'>
				<select id='ff-year' name='year' required>
					<option value=''>Select Academic Year</option>
					{Constants.public.Enums.academic_year.map((year) => <option value={year} key={year}>{year}
					</option>)}
				</select>
				<i>arrow_drop_down</i>
			</div>

			<div className='field border suffix'>
				<select id='ff-field' name='field' required>
					<option value=''>Select Field of Study</option>
					{Constants.public.Enums.field_of_study.map((field) => (
						<option value={field} key={field}>{field}</option>
					))}
				</select>
				<i>arrow_drop_down</i>
			</div>

			<div className='field label border'>
				<input id='ff-major' name='major' type='text' list='majors' required />
				<label htmlFor='ff-major'>Major</label>
			</div>

			<label htmlFor='ff-confm' className='checkbox'>
				<input id='ff-confm' name='confirm' type='checkbox' required />{' '}
				<span>I confirm my participation in the event</span>
			</label>

			{errors.value.length > 0 && (
				<section className='error'>
					<h2>Oops! There were some problems with registering!</h2>
					<ul>
						{errors.value.map((error, index) => <li key={index}>{error}</li>)}
					</ul>
				</section>
			)}

			<button type='submit' className='button' disabled={isRegistering}>
				Submit
			</button>
		</form>
	);
}
