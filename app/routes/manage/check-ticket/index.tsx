import PageTitle from '$components/PageTitle.tsx';
import Banner from '$components/Banner.tsx';
import TicketScanner from '$islands/TicketScanner.tsx';

export default function CheckTicketPage() {
	return (
		<>
			<PageTitle title='Check Ticket' />
			<Banner title="Validate your participants' ticket" />

			<article className='max-w-3xl min-h-[30vh] mx-auto px-4'>
				<TicketScanner />
			</article>
		</>
	);
}
