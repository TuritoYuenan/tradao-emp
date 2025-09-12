import Banner from '$components/Banner.tsx';
import PageTitle from '$components/PageTitle.tsx';

export default function ManagementHomePage() {
	const username = 'Minh-Triet';

	return (
		<>
			<PageTitle title='Management Home' />
			<Banner title={`Welcome back, ${username}`} description='Manage ITea Lab events and Tradao tickets here' />

			<article className='max-w-3xl min-h-[30vh] mx-auto px-4'>
				<section className='border-2 border-[var(--foreground)] rounded-2xl p-4 shadow-xl'>
					<h2 className='text-2xl font-bold'>
						<span className='material-symbols-rounded relative top-[0.3rem]'>
							event
						</span>{' '}
						Events
					</h2>
					<div className='mt-4 flex flex-row-reverse gap-4'>
						<a className='hover:scale-110' href=''>
							<span className='material-symbols-rounded relative top-[0.3rem]'>
								table_view
							</span>{' '}
							View Events
						</a>
						<a className='hover:scale-110' href='/manage/create-event'>
							<span className='material-symbols-rounded relative top-[0.3rem]'>
								add_diamond
							</span>{' '}
							New Event
						</a>
					</div>
				</section>
				<section className='mt-4 border-2 border-[var(--foreground)] rounded-2xl p-4 shadow-xl'>
					<h2 className='text-2xl font-bold'>
						<span className='material-symbols-rounded relative top-[0.3rem]'>
							local_activity
						</span>{' '}
						Tickets
					</h2>
					<div className='mt-4 flex flex-row-reverse gap-4'>
						<a className='hover:scale-110' href=''>
							<span className='material-symbols-rounded relative top-[0.3rem]'>
								table_view
							</span>{' '}
							View Tickets
						</a>
						<a className='hover:scale-110' href=''>
							<span className='material-symbols-rounded relative top-[0.3rem]'>
								add_diamond
							</span>{' '}
							New Ticket
						</a>
					</div>
				</section>
			</article>
		</>
	);
}
