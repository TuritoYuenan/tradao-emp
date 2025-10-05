import { define } from '$lib/utils.ts';
import { supabase } from '$lib/supabase.ts';
import { Banner } from '$components/Banner.tsx';
import { PageTitle } from '$components/PageTitle.tsx';
import { EventsFeed } from '$islands/EventsFeed.tsx';

export const handler = define.handlers({
	async GET(_ctx) {
		const { data, error } = await supabase
			.from('upcoming_events')
			.select('*');

		if (error) {
			console.error(error);
			return { data: [] };
		}

		return { data: data ?? [] };
	},
});

export default define.page<typeof handler>(function EventBrowsePage(props) {
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
});
