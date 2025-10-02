import { Handlers } from '$fresh/server.ts';
import { supabase } from '$lib/supabase.ts';

export const handler: Handlers = {
	async POST(req, _ctx) {
		const formData = await req.json();
		const redirectTo = formData.redirectTo || '/manage';

		const { data: { user }, error } = await supabase.auth.getUser();
		if (error || !user) {
			const { email, password } = formData;
			const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

			if (signInError) {
				return new Response(
					JSON.stringify({ errors: [signInError.message] }),
					{ status: 400, headers: { 'Content-Type': 'application/json' } },
				);
			}

			const sessionData = {
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token,
				expires_at: data.session.expires_at
			};

			const headers = new Headers({
				'Content-Type': 'application/json',
				'Set-Cookie': `sb-session=${JSON.stringify(sessionData)}; Path=/; HttpOnly; Secure; SameSite=Lax`
			});

			return new Response(JSON.stringify({ redirectTo }), { status: 200, headers });
		}

		return new Response(
			JSON.stringify({ redirectTo }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	},
};
