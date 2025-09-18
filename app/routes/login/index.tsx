import { Handlers } from '$fresh/server.ts';
import { isLoggedIn } from '$lib/auth.ts';
import PageTitle from '$components/PageTitle.tsx';

export const handler: Handlers = {
	GET(req, ctx) {
		if (isLoggedIn(req)) {
			const url = new URL(req.url);
			const redirectTo = url.searchParams.get('redirectTo') || '/manage';
			return new Response('', { status: 307, headers: { Location: redirectTo } });
		}

		return ctx.render();
	},
};

export default function LoginPage() {
	return (
		<>
			<PageTitle title='Login' />
			<article></article>
		</>
	);
}
