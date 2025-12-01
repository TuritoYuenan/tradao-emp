import { define } from '$lib/utils.ts';
import { Banner } from '$components/Banner.tsx';
import { PageMetadata } from '$components/PageMetadata.tsx';
import { TicketScanner } from '$islands/TicketScanner.tsx';

export default define.page(function CheckTicketPage() {
	return (
		<>
			<PageMetadata title='Check Ticket' />
			<Banner title="Validate your participants' ticket" />

			<article className='max-w-3xl min-h-[30vh] mx-auto px-4'>
				<TicketScanner />
			</article>
		</>
	);
});
