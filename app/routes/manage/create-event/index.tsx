import Banner from '$components/Banner.tsx';
import PageTitle from '$components/PageTitle.tsx';
import EventCreationForm from '$islands/EventCreationForm.tsx';

export default function CreateEventPage() {
	return (
		<article>
			<PageTitle title='Create New Event' />
			<Banner title='Create New Event' description='What will you announce today?' />
			<EventCreationForm />
		</article>
	);
}
