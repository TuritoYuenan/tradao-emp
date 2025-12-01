import { define } from '$lib/utils.ts';
import { Navigation } from '$components/Navigation.tsx';
import { Footer } from '$components/Footer.tsx';

const menuItems = [
	{ name: 'Manage', href: '/manage', icon: 'manage_accounts', external: false },
	{
		name: 'ITea Lab',
		href: 'https://itealab.vercel.app',
		icon: 'home',
		external: true,
	},
];

/**
 * Explore - Links to internal ITea Lab sections
 */
const explore = [
	{ name: 'About', href: '/' },
	{ name: 'Community', href: '/' },
	{ name: 'Join Us', href: '/' },
];

/**
 * Community - Links to external ITea Lab social media
 */
const community = [
	{ name: 'GitHub', href: 'https://github.com/itea-lab' },
	{ name: 'Facebook', href: 'https://facebook.com/ITeaLabTeam/' },
	{ name: 'LinkedIn', href: 'https://linkedin.com/company/itea-lab' },
];

/**
 * Contact - Contact information for ITea Lab
 */
const contact = {
	email: 'contact.itealab@gmail.com',
	address: 'A35 Bach Dang street, Tan Binh district, Ho Chi Minh city, Vietnam',
};

export default define.layout(function App({ Component }) {
	return (
		<html lang='en-VN'>
			<head>
				<meta charset='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='icon' href='/icons/icon.svg' />
				<link rel='manifest' href='/manifest.json' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
				/>
			</head>
			<body>
				<div className='contents'>
					<Navigation menuItems={menuItems} />
					<main className='min-h-dvh'>
						<Component />
					</main>
					<Footer explore={explore} community={community} contact={contact} />
				</div>
			</body>
		</html>
	);
});
