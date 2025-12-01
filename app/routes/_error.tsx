import { HttpError, PageProps } from 'fresh';
import { PageMetadata } from '$components/PageMetadata.tsx';

const Error404 = (url: URL) => (
	<>
		<PageMetadata title='404 Not Found' />
		<article className='grid place-items-center h-screen text-center px-4'>
			<h1>404</h1>
			<p>Cannot find the page at the following address: {url.pathname}</p>
		</article>
	</>
);

const Error500 = () => (
	<>
		<PageMetadata title='500 Internal Server Error' />
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

export default function ErrorPage(props: PageProps) {
	const error = props.error;
	if (error instanceof HttpError) {
		const status = error.status;

		if (status === 404) return Error404(props.url);
		if (status === 500) return Error500();
	}

	return <h1>Oh no...</h1>;
}
