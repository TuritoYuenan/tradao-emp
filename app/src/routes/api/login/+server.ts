import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase }, cookies }) => {
	const formData = await request.json();
	const redirectTo = formData.redirectTo || '/manage';

	const { email, password } = formData;
	const { data, error: signInError } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (signInError) {
		return json({ errors: [signInError.message] }, { status: 400 });
	}

	return json({ redirectTo }, { status: 200 });
};
