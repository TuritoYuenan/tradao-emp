import { define } from '$lib/utils.ts';
import { Banner } from '$components/Banner.tsx';
import { PageMetadata } from '$components/PageMetadata.tsx';
import { TicketScanner } from '$islands/TicketScanner.tsx';

export default define.page(function CheckTicketPage() {
	return (
		<>
			<PageMetadata title='Check Ticket' />
			<Banner title="Validate your participants' ticket" />

			<TicketScanner />
		</>
	);
});
