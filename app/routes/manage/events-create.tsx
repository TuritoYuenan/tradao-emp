import { define } from '$lib/utils.ts';
import { Banner } from '$components/Banner.tsx';
import { PageMetadata } from '$components/PageMetadata.tsx';
import { EventCreationForm } from '$islands/EventCreationForm.tsx';

export default define.page(function CreateEventPage() {
	return (<>
		<PageMetadata title='Create New Event' />
		<Banner title='Create New Event' description='What will you announce today?' />

		<article style={{ maxWidth: '90ch', margin: 'auto' }}>
			<EventCreationForm />
		</article>
	</>);
});
