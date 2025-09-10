import { PageProps } from '$fresh/server.ts';
import PageTitle from '$components/PageTitle.tsx';

export default function NotFoundPage({ url }: PageProps) {
	return (
		<>
			<PageTitle title='404 Not Found' />
			<article className='grid place-items-center h-screen text-center px-4'>
				<h1>404</h1>
				<p>Cannot find the page at the following address: {url.pathname}</p>
			</article>
		</>
	);
}
