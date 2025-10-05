import { define } from '$lib/utils.ts';
import { supabase } from '$lib/supabase.ts';

export default define.middleware(async (ctx) => {
	const url = new URL(ctx.req.url);
	if (!url.pathname.startsWith('/manage')) return ctx.next();

	const { data: { user }, error } = await supabase.auth.getUser();

	if (!error && user) {
		console.log('Middleware: User is logged in: ', user.email);
		return ctx.next();
	}

	console.log('Middleware: Not logged in, redirecting to login');
	const redirectTo = encodeURIComponent(url.pathname + url.search);
	return Response.redirect(new URL(`/login?redirectTo=${redirectTo}`, ctx.req.url), 303);
});
