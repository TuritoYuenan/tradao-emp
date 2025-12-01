import { Head } from 'fresh/runtime';

export function PageMetadata({ title }: { title: string }) {
	return (
		<Head>
			<title>{title} | Tradao by ITea Lab&trade;</title>
		</Head>
	);
}
