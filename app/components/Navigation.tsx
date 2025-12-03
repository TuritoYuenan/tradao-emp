import { NavigationProps } from '$lib/props.ts';
import { TextClock } from '$islands/TextClock.tsx';

export function Navigation({ menuItems }: NavigationProps) {
	return (
		<nav className='top l'>
			<p className='large-text'>
				<a href='/'>
					<img src='/logos/logo_dark.svg' alt='Tradao Logo' style={{ height: '3rem' }} />
				</a>
			</p>

			<div className='max'></div>

			<div className='row'>
				<TextClock />
				<span className='hidden md:inline'>|</span>
				{menuItems.map((item) => (
					<a
						className='hover:scale-110'
						key={item.name}
						href={item.href}
						target={item.external ? '_blank' : '_self'}
						rel={item.external ? 'noopener noreferrer' : ''}
					>
						<i>{item.icon}</i> {item.name}
					</a>
				))}
			</div>
		</nav>
	);
}
