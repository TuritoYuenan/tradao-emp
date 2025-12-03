import { define, formatDate } from '$lib/utils.ts';
import { TicketLookupProps } from '$lib/props.ts';
import { supabase } from '$lib/supabase.ts';
import { PageMetadata } from '$components/PageMetadata.tsx';
import { Banner } from '$components/Banner.tsx';

export const handler = define.handlers<TicketLookupProps>({
	async GET(ctx) {
		const ticketID = ctx.params.id;

		const { data, error: err } = await supabase
			.functions.invoke(`get-ticket?ticketID=${ticketID}`, {
				method: 'GET',
				headers: {},
			});

		if (err) throw err;

		return { data: data ?? [] };
	},
});

function TicketHeader({ props }: { props: TicketLookupProps }) {
	return <h2 className='small'>{props.lookup.event_title}</h2>;
}

function TicketDetails({ props }: { props: TicketLookupProps }) {
	return (
		<dl className='grid' left-align>
			<dt className='s6 right-align'>
				<strong>Name</strong>
			</dt>
			<dd className='s6 left-align'>{props.lookup.name}</dd>
			<dt className='s6 right-align'>
				<strong>Email</strong>
			</dt>
			<dd className='s6 left-align'>{props.lookup.email}</dd>
			<dt className='s6 right-align'>
				<strong>Academic Year</strong>
			</dt>
			<dd className='s6 left-align'>{props.lookup.academic_year}</dd>
			<dt className='s6 right-align'>
				<strong>Field of Study</strong>
			</dt>
			<dd className='s6 left-align'>{props.lookup.field_of_study}</dd>
			<dt className='s6 right-align'>
				<strong>Major</strong>
			</dt>
			<dd className='s6 left-align'>{props.lookup.major}</dd>
			<dt className='s6 right-align'>
				<strong>Participating</strong>
			</dt>
			<dd className='s6 left-align'>{props.lookup.participate ? 'Yes' : 'No'}</dd>
			<dt className='s6 right-align'>
				<strong>Created At</strong>
			</dt>
			<dd className='s6 left-align'>{formatDate(props.lookup.created_at!)}</dd>
		</dl>
	);
}

function TicketFooter({ props }: { props: TicketLookupProps }) {
	return (
		<section id='footer'>
			<a href={props.saveURL} target='_blank' rel='noopener noreferrer'>
				<img
					src='/buttons/enAU_add_to_google_wallet_add-wallet-badge.svg'
					alt='Add to Google Wallet'
				/>
			</a>
			<p>{props.lookup.ticket_id}</p>
		</section>
	);
}

export default define.page<typeof handler>(function TicketLookupPage(props) {
	return (
		<>
			<PageMetadata title={'Your Ticket for ' + props.data.lookup.event_title} />

			<Banner title='Here is your event ticket!' />

			<article className='center-align' style={{ maxWidth: '90ch', margin: 'auto' }}>
				<TicketHeader props={props.data} />
				<hr className='large' />
				<TicketDetails props={props.data} />
				<hr className='large' />
				<TicketFooter props={props.data} />
			</article>
		</>
	);
});
