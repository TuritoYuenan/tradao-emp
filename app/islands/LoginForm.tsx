import { useSignal } from '@preact/signals';

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
	const isSubmitting = useSignal(false);
	const errors = useSignal<string[]>([]);

	async function handleLogin(e: Event) {
		isSubmitting.value = true;
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form).entries());

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...data, redirectTo }),
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
				// Success - redirecting
				const data = await response.json();
				const redirectTo = data.redirectTo || '/manage';
				globalThis.location.href = redirectTo;
				break;
			}

			default: {
				// Unexpected status code
				errors.value = ['Unexpected error. Please try again later.'];
			}
		}
	}

	return (
		<form
			method='POST'
			className='grid gap-4'
			onSubmit={handleLogin}
			noValidate
		>
			<div className='grid gap-1'>
				<label htmlFor='email' className='font-bold'>Email</label>
				<input
					type='email'
					name='email'
					id='email'
					required
					className='p-2 bg-transparent border-2 border-(--foreground) rounded'
				/>
			</div>
			<div className='grid gap-1'>
				<label htmlFor='password' className='font-bold'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					required
					className='p-2 bg-transparent border-2 border-(--foreground) rounded'
				/>
			</div>
			{errors.value.length > 0 && (
				<div className='text-red-500'>
					{errors.value.map((error) => <p key={error}>{error}</p>)}
				</div>
			)}
			<button type='submit' className='button' disabled={isSubmitting}>
				Login
			</button>
		</form>
	);
}
