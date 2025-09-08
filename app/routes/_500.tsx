import { PageProps } from '$fresh/server.ts';

export default function Error500Page({ error }: PageProps) {
	const err = error as Error;
	console.error('500 internal error:', err.message);

	return (
		<article className='grid place-items-center h-screen text-center px-4'>
			<h1>Oops! Something else happened</h1>
			<p>It was on us though, since this happened on our end.</p>
			<p>
				Contact our sole developer at{' '}
				<a href='mailto:104993913@student.swin.edu.au'>104993913@student.swin.edu.au</a>
			</p>
		</article>
	);
}
