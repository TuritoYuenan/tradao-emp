import { TextClock } from '$islands/TextClock.tsx';

const menuItems = [
	{ name: 'Manage', href: '/manage', icon: 'manage_accounts', external: false },
	{
		name: 'Main website',
		href: 'https://itealab.vercel.app',
		icon: 'home',
		external: true,
	},
];

export function Navbar() {
	return (
		<header className='flex flex-col md:flex-row items-center justify-between px-8 py-4 gap-4'>
			<a className='hover:scale-110' href='/'>
				<img
					src='/logos/logo.svg'
					alt='Tradao Logo'
					style={{ height: '4rem' }}
				/>
			</a>
			<nav className='flex flex-row flex-wrap gap-2 justify-center md:items-center'>
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
						<span className='material-symbols-rounded relative top-[0.3rem]'>
							{item.icon}
						</span>{' '}
						{item.name}
					</a>
				))}
			</nav>
		</header>
	);
}
