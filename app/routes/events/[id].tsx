import { define, formatDate, isEventUpcoming } from '$lib/utils.ts';
import { Tables } from '$lib/models.ts';
import { supabase } from '$lib/supabase.ts';
import { EventRegistrationForm } from '$islands/EventRegistrationForm.tsx';
import { PageTitle } from '$components/PageTitle.tsx';

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
			<PageTitle title={event.title} />

			<article className='m-4 grid gap-4 md:grid-cols-3 md:grid-rows-[540px_auto_auto_1fr] md:[grid-template-areas:"image_image_form"_"head_head_loct"_"time_host_loct"_"text_text_loct"] flex flex-col md:flex-none'>
				<div
					className='block aspect-video md:aspect-auto rounded-2xl bg-cover bg-center bg-no-repeat border-2 border-[var(--foreground)] shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:[grid-area:image]'
					style={{ backgroundImage: `url(${event.image})` }}
				/>

				<div className='p-4 border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:[grid-area:head]'>
					<p>{event.category}</p>
					<h1 className='text-3xl font-bold'>{event.title}</h1>
				</div>

				<div className='p-4 border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:[grid-area:form] overflow-y-scroll'>
					<h2 className='text-2xl font-bold'>Participate in this event</h2>
					{isEventUpcoming(event.start_time)
						? <EventRegistrationForm eventID={event.id} />
						: <p className='mt-4'>This event has ended. Registration is closed.</p>}
				</div>

				<div className='p-4 border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:[grid-area:time]'>
					<h2 className='text-2xl font-bold'>Event Time</h2>
					<p>
						<span className='material-symbols-rounded relative top-[0.3rem]'>
							event
						</span>{' '}
						<strong>Start:</strong> {formatDate(event.start_time)}
					</p>
					<p>
						<span className='material-symbols-rounded relative top-[0.3rem]'>
							event
						</span>{' '}
						<strong>End:</strong> {formatDate(event.end_time)}
					</p>
				</div>

				<div className='p-4 border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:[grid-area:host]'>
					<h2 className='text-2xl font-bold'>Event Host</h2>
					<p>{event.host}</p>
					<p>104993913@student.swin.edu.au</p>
				</div>

				<div className='p-4 border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:[grid-area:loct]'>
					<h2 className='text-2xl font-bold'>Event Location</h2>
					<p>{event.location}</p>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d538.0976707808976!2d106.6689481567678!3d10.816110200767868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752931fede9f91%3A0x1fe04aae50f65b1f!2zU3dpbmJ1cm5lIFZp4buHdCBOYW0gLSBDxqEgc-G7nyBUUCBIQ00!5e1!3m2!1sen!2sau!4v1750058710892!5m2!1sen!2sau'
						loading='lazy'
						referrerpolicy='no-referrer-when-downgrade'
						title='Event Location Map'
						className='w-full mt-4 aspect-[10/8.5] border-none rounded-2xl'
					/>
				</div>

				<div className='p-4 border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:[grid-area:text]'>
					<p>{event.description}</p>
				</div>
			</article>
		</>
	);
});
