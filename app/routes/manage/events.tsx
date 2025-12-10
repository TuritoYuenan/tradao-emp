import { define } from '$lib/utils.ts';
import { Banner } from '$components/Banner.tsx';
import { PageMetadata } from '$components/PageMetadata.tsx';
import { supabase } from '$lib/supabase.ts';
import { Tables } from '$lib/models.ts';

export const handler = define.handlers({
	async GET(_ctx) {
		const { data, error } = await supabase
			.from('community_events')
			.select('*')
			.order('start_time', { ascending: false });

		if (error) {
			console.error(error);
			return { data: [] };
		}

		return { data: data ?? [] };
	},
});

export default define.page<typeof handler>(function ViewEventsPage(props) {
	const data = props.data;

	return (
		<>
			<PageMetadata title='Manage Events' />
			<Banner title='Manage Events' />

			<div className='grid'>
				{data.map((event) => <EventCard key={event.id} event={event} />)}
			</div>
		</>
	);
});

const EventCard = ({ event }: { event: Tables<'community_events'> }) => {
	return (
		<article className='card s12 m6'>
			<h2 className='small'>{event.title}</h2>
			<p>{event.description}</p>
			<p>
				<strong>Start Time:</strong> {new Date(event.start_time).toLocaleString()}
			</p>
			<p>
				<strong>End Time:</strong> {new Date(event.end_time).toLocaleString()}
			</p>

			<div className='right-align'>
				<button type='button'>
					<i>edit</i> Edit
				</button>
				<button type='button'>
					<i>delete</i> Delete
				</button>
			</div>
		</article>
	);
};
