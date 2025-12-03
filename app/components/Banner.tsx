import { BannerProps } from '$lib/props.ts';

export function Banner({ title, description }: BannerProps) {
	return (
		<header className='large-padding'>
			<h1 className='small center-align'>{title}</h1>
			{description && <p className='large-text center-align'>{description}</p>}
		</header>
	);
}
