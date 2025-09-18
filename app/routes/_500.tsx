import { PageProps } from '$fresh/server.ts';
import PageTitle from '$components/PageTitle.tsx';

export default function Error500Page({ error: _ }: PageProps) {
	return (
		<>
			<PageTitle title='500 Internal Server Error' />
			<article className='grid place-items-center h-screen text-center px-4'>
				<div>
					<h1>Oops! Something else happened</h1>
					<p>It was on us though, since this happened on our end.</p>
					<p>
						Contact our sole developer at{' '}
						<a href='mailto:104993913@student.swin.edu.au'>104993913@student.swin.edu.au</a>
					</p>
				</div>
			</article>
		</>
	);
}
