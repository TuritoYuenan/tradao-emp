import { define } from '$lib/utils.ts';
import { supabase } from '$lib/supabase.ts';

const authMiddleware = define.middleware(async (ctx) => {
	const url = new URL(ctx.req.url);
	if (!url.pathname.startsWith('/manage')) return ctx.next();

	const { data: { user }, error } = await supabase.auth.getUser();

	if (!error && user) {
		console.log('Auth>', 'User is logged in:', user.email);
		return ctx.next();
	}

	console.log('Auth>', 'User is NOT logged in => Redirecting');
	const redirectTo = encodeURIComponent(url.pathname + url.search);
	return new Response(null, {
		status: 303,
		headers: {
			Location: new URL(`/login?redirectTo=${redirectTo}`, ctx.req.url).toString(),
		},
	});
});

export default [authMiddleware];
