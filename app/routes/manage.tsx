import { define } from '$lib/utils.ts';
import { supabase } from '$lib/supabase.ts';
import { User } from '@supabase/supabase-js';
import { Banner } from '$components/Banner.tsx';
import { PageMetadata } from '$components/PageMetadata.tsx';

export const handler = define.handlers<User | null>({
	async GET(_ctx) {
		const { data: { user }, error } = await supabase.auth.getUser();
		if (error) return new Response(error.message, { status: 500 });
		console.log("Manage>", "User is logged in:", user?.id);

		return { data: user };
	},
});

export default define.page<typeof handler>(function ManagementHomePage(props) {
	const username = props.data?.email ?? 'User';

	return (
		<>
			<PageMetadata title='Management Home' />
			<Banner title={`Welcome back, ${username}`} description='Manage ITea Lab events and Tradao tickets here' />

			<section style={{ maxWidth: '90ch', margin: 'auto' }}>
				<a className='block' href='/manage/view-events'>
					<article>
						<h2 style={{ fontSize: '2em' }}>
							<i>event</i> Manage Events
						</h2>
						<div className='row right-align'>
							<i>arrow_forward</i>
						</div>
					</article>
				</a>

				<div className='space'></div>

				<a className='block' href=''>
					<article>
						<h2 style={{ fontSize: '2em' }}>
							<i>local_activity</i> Manage Tickets
						</h2>
						<div className='row right-align'>
							<i>arrow_forward</i>
						</div>
					</article>
				</a>

				<div className='space'></div>

				<a className='block' href='/manage/check-ticket'>
					<article>
						<h2 style={{ fontSize: '2em' }}>
							<i>check</i> Check-in via Ticket QR code
						</h2>
						<div className='row right-align'>
							<i>arrow_forward</i>
						</div>
					</article>
				</a>
			</section>
		</>
	);
});
