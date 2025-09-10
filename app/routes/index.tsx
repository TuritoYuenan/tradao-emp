import { Handlers, PageProps } from '$fresh/server.ts';
import { Tables } from '$lib/models.ts';
import { supabase } from '$lib/supabase.ts';
import Banner from '$components/Banner.tsx';
import EventsFeed from '$islands/EventsFeed.tsx';
import PageTitle from '$components/PageTitle.tsx';

export const handler: Handlers<Tables<'upcoming_events'>[]> = {
	async GET(_req, ctx) {
		const { data, error } = await supabase
			.from('upcoming_events')
			.select('*');

		if (error) {
			console.error(error);
			return ctx.render([]);
		}

		return ctx.render(data ?? []);
	},
};

export default function EventBrowsePage(props: PageProps<Tables<'upcoming_events'>[]>) {
	return (
		<>
			<PageTitle title='Browse the latest lab events!' />
			<Banner
				title='Upcoming Events'
				description='Check out the latest workshops, conferences, public talks and discussions in ITea Lab!'
			/>
			<EventsFeed events={props.data} />
		</>
	);
}
