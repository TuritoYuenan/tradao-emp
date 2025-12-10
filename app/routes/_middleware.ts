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
	return ctx.redirect(`/login?redirectTo=${redirectTo}`, 303);
});

export default [authMiddleware];
