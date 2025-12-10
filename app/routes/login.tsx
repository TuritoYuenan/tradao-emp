import { define } from '$lib/utils.ts';
import { supabase } from '$lib/supabase.ts';
import { Banner } from '$components/Banner.tsx';
import { PageMetadata } from '$components/PageMetadata.tsx';
import { LoginForm } from '$islands/LoginForm.tsx';

export const handler = define.handlers({
	async GET(ctx) {
		const url = new URL(ctx.req.url);
		const redirectTo = url.searchParams.get('redirectTo') || '/manage';

		const { data: { user }, error } = await supabase.auth.getUser();
		if (error || !user) return { data: { redirectTo } };

		console.log('Already logged in, redirecting to manage');
		return Response.redirect(new URL(redirectTo, ctx.req.url), 303);
	},
});

export default function LoginPage({ redirectTo }: { redirectTo?: string }) {
	return (
		<>
			<PageMetadata title='Login' />
			<Banner title='Login as event organiser' />
			<LoginForm redirectTo={redirectTo} />
		</>
	);
}
