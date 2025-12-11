import { NavigationProps } from '$lib/props.ts';
import { TextClock } from '$islands/TextClock.tsx';

export function Navigation({ menuItems }: NavigationProps) {
	return (
		<>
			{/* Medium & Large Screen: Top navigation bar */}
			<nav className='top m l'>
				<p className='large-text'>
					<a href='/'>
						<img src='/logos/logo_dark.svg' alt='Tradao Logo' style={{ height: '3rem' }} />
					</a>
				</p>

				<div className='max'></div>

				<div className='row'>
					<TextClock />
					<span>|</span>
					<MenuItems menuItems={menuItems} />
				</div>
			</nav>

			{/* Small Screen: Bottom navigation bar */}
			<nav className='bottom s'>
				<MenuItems menuItems={menuItems} />
			</nav>
		</>
	);
}

function MenuItems({ menuItems }: NavigationProps) {
	return menuItems.map((item) => (
		<a
			key={item.name}
			href={item.href}
			target={item.external ? '_blank' : '_self'}
			rel={item.external ? 'noopener noreferrer' : ''}
		>
			<i className='prefix-icon'>{item.icon}</i> {item.name}
		</a>
	));
}
