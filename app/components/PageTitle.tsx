import { Head } from '$fresh/runtime.ts';

export default function PageTitle({ title }: { title: string }) {
	return (
		<Head>
			<title>{title} | Tradao by ITea Lab&trade;</title>
		</Head>
	);
}
