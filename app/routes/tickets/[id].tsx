import { Handlers, PageProps } from '$fresh/server.ts';
import { TicketLookupProps } from '$lib/props.ts';
import { supabase } from '$lib/supabase.ts';
import { formatDate } from '$lib/utils.ts';
import Banner from '$components/Banner.tsx';
import PageTitle from '$components/PageTitle.tsx';

export const handler: Handlers<TicketLookupProps> = {
	async GET(_req, ctx) {
		const ticketID = ctx.params.id;

		const { data, error: err } = await supabase
			.functions.invoke(`get-ticket?ticketID=${ticketID}`, {
				method: 'GET',
				headers: {},
			});

		if (err) throw err;

		return ctx.render({ ...data });
	},
};

function TicketHeader({ props }: { props: TicketLookupProps }) {
	return <h2 className='text-2xl text-center font-bold'>{props.lookup.event_title}</h2>;
}

function TicketDetails({ props }: { props: TicketLookupProps }) {
	return (
		<dl className='grid gap-2 gap-x-4' style={{ gridTemplateColumns: 'auto auto' }}>
			<dt className='font-bold text-right'>Name</dt>
			<dd>{props.lookup.name}</dd>
			<dt className='font-bold text-right'>Email</dt>
			<dd>{props.lookup.email}</dd>
			<dt className='font-bold text-right'>Academic Year</dt>
			<dd>{props.lookup.academic_year}</dd>
			<dt className='font-bold text-right'>Field of Study</dt>
			<dd>{props.lookup.field_of_study}</dd>
			<dt className='font-bold text-right'>Major</dt>
			<dd>{props.lookup.major}</dd>
			<dt className='font-bold text-right'>Participating</dt>
			<dd>{props.lookup.participate ? 'Yes' : 'No'}</dd>
			<dt className='font-bold text-right'>Created At</dt>
			<dd>{formatDate(props.lookup.created_at!)}</dd>
		</dl>
	);
}

function TicketFooter({ props }: { props: TicketLookupProps }) {
	return (
		<section id='footer' className='text-center'>
			<a href={props.saveURL} id='save-button' target='_blank' rel='noopener noreferrer'>
				<img
					src='/buttons/enAU_add_to_google_wallet_add-wallet-badge.svg'
					alt='Add to Google Wallet'
					className='mx-auto'
				/>
			</a>
			<p>{props.lookup.ticket_id}</p>
		</section>
	);
}

export default function TicketLookupPage(props: PageProps<TicketLookupProps>) {
	return (
		<>
			<PageTitle title={'Your Ticket for ' + props.data.lookup.event_title} />
			<Banner title='Here is your event ticket!' />

			<div className='p-4'>
				<article
					className='max-w-[90ch] mx-auto p-4 border-2 rounded-2xl relative'
					style={{ borderColor: 'var(--foreground)' }}
				>
					<TicketHeader props={props.data} />
					<hr className='my-4 border rounded-2xl' style={{ borderColor: 'var(--foreground)' }} />
					<TicketDetails props={props.data} />
					<hr className='my-4 border rounded-2xl' style={{ borderColor: 'var(--foreground)' }} />
					<TicketFooter props={props.data} />
				</article>
			</div>
		</>
	);
}
