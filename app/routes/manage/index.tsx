import Banner from '$components/Banner.tsx';

export default function ManagementHomePage() {
	const username = 'Minh-Triet';

	return (
		<>
			<Banner title={`Welcome back, ${username}`} description='Manage ITea Lab events and Tradao tickets here' />

			<article>
				<section className='max-w-3xl min-h-[30vh] mx-auto grid content-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4'>
					<div className='p-4 text-center rounded-2xl shadow-md' style={{ backgroundColor: 'var(--green)' }}>
						<a href='/manage-events'>
							<span className='material-symbols-rounded' style={{ fontSize: '6rem' }}>event</span>
							<h2 className='text-2xl font-bold'>Events CRUD</h2>
						</a>
					</div>
					<div className='p-4 text-center rounded-2xl shadow-md' style={{ backgroundColor: 'var(--green)' }}>
						<a href='/manage-tickets'>
							<span className='material-symbols-rounded' style={{ fontSize: '6rem' }}>
								local_activity
							</span>
							<h2 className='text-2xl font-bold'>Tickets CRUD</h2>
						</a>
					</div>
					<div className='p-4 text-center rounded-2xl shadow-md' style={{ backgroundColor: 'var(--green)' }}>
						<a href='/manage-admins'>
							<span className='material-symbols-rounded' style={{ fontSize: '6rem' }}>
								manage_accounts
							</span>
							<h2 className='text-2xl font-bold'>Admins CRUD</h2>
						</a>
					</div>
				</section>
			</article>
		</>
	);
}
