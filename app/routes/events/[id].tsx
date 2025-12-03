import { define, formatDate, isEventUpcoming } from '$lib/utils.ts';
import { Tables } from '$lib/models.ts';
import { supabase } from '$lib/supabase.ts';
import { EventRegistrationForm } from '$islands/EventRegistrationForm.tsx';
import { PageMetadata } from '$components/PageMetadata.tsx';

export const handler = define.handlers<Tables<'community_events'>>({
	async GET(ctx) {
		const eventID = ctx.params.id;

		const { data, error } = await supabase
			.from('community_events')
			.select('*')
			.eq('id', eventID)
			.limit(1)
			.single();

		if (error) throw error;

		return { data: data };
	},
});

export default define.page<typeof handler>(function EventDetailsPage(props) {
	const event = props.data;
	return (
		<>
			<PageMetadata title={event.title} />

			<div className='grid-base' id='event-details-page'>
				<article className='border no-padding' style={{ gridArea: 'image' }}>
					<img src={event.image} alt='' className='responsive' />
				</article>

				<article className='border' style={{ gridArea: 'head' }}>
					<div className='row wrap'>
						<p class='chip'>{event.category}</p>
					</div>
					<h1 className='small'>{event.title}</h1>
				</article>

				<article className='border' style={{ gridArea: 'form', overflowY: 'scroll' }}>
					<h2 className='small'>Participate in this event</h2>
					{isEventUpcoming(event.start_time)
						? <EventRegistrationForm eventID={event.id} />
						: <p className='mt-4'>This event has ended. Registration is closed.</p>}
				</article>

				<article className='border' style={{ gridArea: 'time' }}>
					<h2 className='small'>Event Time</h2>
					<p>
						<i>event</i> <strong>Start:</strong> {formatDate(event.start_time)}
					</p>
					<p>
						<i>event</i> <strong>End:</strong> {formatDate(event.end_time)}
					</p>
				</article>

				<article className='border' style={{ gridArea: 'host' }}>
					<h2 className='small'>Event Host</h2>
					<p>{event.host}</p>
					<p>104993913@student.swin.edu.au</p>
				</article>

				<article className='border' style={{ gridArea: 'loct' }}>
					<h2 className='small'>Event Location</h2>
					<p>{event.location}</p>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d538.0976707808976!2d106.6689481567678!3d10.816110200767868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752931fede9f91%3A0x1fe04aae50f65b1f!2zU3dpbmJ1cm5lIFZp4buHdCBOYW0gLSBDxqEgc-G7nyBUUCBIQ00!5e1!3m2!1sen!2sau!4v1750058710892!5m2!1sen!2sau'
						loading='lazy'
						referrerpolicy='no-referrer-when-downgrade'
						title='Event Location Map'
						className='responsive'
					/>
				</article>

				<article className='border' style={{ gridArea: 'text' }}>
					<p>{event.description}</p>
				</article>
			</div>
		</>
	);
});
