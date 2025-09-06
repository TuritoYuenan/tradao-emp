import { Tables } from '$lib/models.ts';
import { formatDate } from '$lib/utils.ts';

export default function EventCard({ event }: { event: Tables<'upcoming_events'> }) {
	return (
		<div className="grid grid-cols-[250px_1fr_auto] items-center md:max-w-[900px]:grid-cols-[1fr_2fr] md:max-w-[900px]:grid-rows-[auto_auto] md:max-w-[900px]:[grid-template-areas:'image_details'_'image_register'] max-sm:grid-cols-1 border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)]">
			<div
				className='w-full h-full rounded-l-2xl bg-center bg-no-repeat bg-cover md:max-w-[900px]:[grid-area:image] max-sm:rounded-t-2xl max-sm:rounded-l-none'
				style={{ backgroundImage: `url(${event.image})`, aspectRatio: '16/9' }}
			/>
			<div className='p-4 md:max-w-[900px]:[grid-area:details]'>
				<h2 className='text-2xl font-bold line-clamp-2 text-ellipsis'>{event.title}</h2>
				<p>
					<span className='material-symbols-rounded relative' style={{ top: '0.3rem' }}>event</span>{' '}
					<strong>Date:</strong> {event.start_time ? formatDate(event.start_time) : 'N/A'} &ndash;{' '}
					{event.end_time ? formatDate(event.end_time) : 'N/A'}
				</p>
				<p>
					<span className='material-symbols-rounded relative' style={{ top: '0.3rem' }}>location_on</span>
					{' '}
					<strong>Location:</strong> {event.location}
				</p>
			</div>
			<div className='p-4 md:max-w-[900px]:[grid-area:register] md:max-w-[900px]:self-start max-sm:pt-0'>
				<a className='cta' href={`/events/${event.id}`}>Register</a>
			</div>
		</div>
	);
}
