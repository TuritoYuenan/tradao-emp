import { Head } from 'fresh/runtime';

export function PageTitle({ title }: { title: string }) {
	return (
		<Head>
			<title>{title} | Tradao by ITea Lab&trade;</title>
		</Head>
	);
}
