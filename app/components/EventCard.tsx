import { EventCardProps } from '$lib/props.ts';
import { formatDate, isEventUpcoming } from '$lib/utils.ts';

export function EventCard({ event }: EventCardProps) {
	return (
		<article className='no-padding grid middle-align border'>
			<div className='s12 m3'>
				<img
					className='responsive'
					src={event.image ? event.image : 'https://placehold.co/160x90'}
					style={{ aspectRatio: '16/9' }}
				/>
			</div>
			<div className='padding s12 m8'>
				<h2 className='small'>{event.title}</h2>
				<p>
					<i>event</i> <strong>Date:</strong> {event.start_time ? formatDate(event.start_time) : 'N/A'}{' '}
					&ndash; {event.end_time ? formatDate(event.end_time) : 'N/A'}
				</p>
				<p>
					<i>location_on</i> <strong>Location:</strong> {event.location}
				</p>
			</div>
			<div className='padding s12 m1'>
				<a className='button' href={`/events/${event.id}`}>
					{isEventUpcoming(event.start_time!) ? 'Register' : 'View'}
				</a>
			</div>
		</article>
	);
}
