import { define } from '$lib/utils.ts';
import { Banner } from '$components/Banner.tsx';
import { PageTitle } from '$components/PageTitle.tsx';

export default define.page(function ViewEventsPage() {
	return (
		<>
			<PageTitle title='Manage Events' />
			<Banner title='View Events' />
			<section className='p-4'>
				<table className='mx-auto container-md table-auto w-full border-collapse border border-[--foreground]'>
					<thead>
						<tr className='bg-[--foreground] text-[--background]'>
							<th className='p-2'>Event Name</th>
							<th className='p-2'>Date</th>
							<th className='p-2'>Location</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='p-2'>Sample Event 1</td>
							<td className='p-2'>2024-07-01</td>
							<td className='p-2'>New York</td>
						</tr>
					</tbody>
				</table>
			</section>
		</>
	);
});
