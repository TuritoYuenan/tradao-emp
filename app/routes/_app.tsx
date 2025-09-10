import { type PageProps } from '$fresh/server.ts';
import Footer from '$components/Footer.tsx';
import Navbar from '$components/Navbar.tsx';

export default function App({ Component }: PageProps) {
	return (
		<html lang='en-VN'>
			<head>
				<meta charset='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='stylesheet' href='/styles.css' />
				<link rel='icon' href='/icons/icon.svg' />
				<link rel='manifest' href='/manifest.json' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
				/>
			</head>
			<body>
				<div className='contents'>
					<Navbar />
					<main className='min-h-dvh'>
						<Component />
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
