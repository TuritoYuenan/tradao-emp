import { FreshContext } from '$fresh/server.ts';
import { isLoggedIn } from '$lib/auth.ts';

export function handler(req: Request, ctx: FreshContext) {
	const url = new URL(req.url);

	if (url.pathname.startsWith('/manage')) {
		if (!isLoggedIn(req)) {
			const redirectTo = encodeURIComponent(url.pathname + url.search);
			return new Response(null, {
				status: 302,
				headers: { Location: `/login?redirectTo=${redirectTo}` }
			});
		}
	}

	return ctx.next();
}
