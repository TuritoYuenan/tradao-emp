import { Handlers } from '$fresh/server.ts';
import PageTitle from '$components/PageTitle.tsx';
import Banner from '$components/Banner.tsx';
import { supabase } from '$lib/supabase.ts';
import { LoginForm } from '$islands/LoginForm.tsx';

export const handler: Handlers = {
	async GET(req, ctx) {
		const url = new URL(req.url);
		const redirectTo = url.searchParams.get('redirectTo') || '/manage';

		const { data: { user }, error } = await supabase.auth.getUser();
		if (error || !user) return ctx.render({ redirectTo });

		console.log('Already logged in, redirecting to manage');
		return Response.redirect(new URL(redirectTo, req.url), 303);
	}
};

export default function LoginPage({ redirectTo }: { redirectTo?: string }) {
	return (
		<>
			<PageTitle title='Login' />
			<Banner title='Login' />
			<div className='p-4'>
				<article className='max-w-2xl mx-auto p-4 border-2 rounded-2xl relative border-[--foreground]'>
					<SSOButtons />
					<hr className='my-4 border rounded-2xl border-[--foreground]' />
					<LoginForm redirectTo={redirectTo} />
				</article>
			</div>
		</>
	);
}

function SSOButtons() {
	return (
		<div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
			<button type='button' className='button'>
				<span>Sign in with Google</span>
			</button>
			<button type='button' className='button'>
				<span>Sign in with GitHub</span>
			</button>
		</div>
	);
}
