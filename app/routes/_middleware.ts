import { FreshContext } from '$fresh/server.ts';
import { supabase } from '$lib/supabase.ts';

export async function handler(req: Request, ctx: FreshContext) {
	const url = new URL(req.url);
	if (!url.pathname.startsWith('/manage')) return ctx.next();

	const { data: { user }, error } = await supabase.auth.getUser();

	if (!error && user) {
		console.log('Middleware: User is logged in: ', user.email);
		return ctx.next();
	}

	console.log('Middleware: Not logged in, redirecting to login');
	const redirectTo = encodeURIComponent(url.pathname + url.search);
	return Response.redirect(new URL(`/login?redirectTo=${redirectTo}`, req.url), 303);
}
