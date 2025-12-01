import { FooterProps } from '$lib/props.ts';
import { Leaf } from './Leaf.tsx';

export function Footer({ explore, community, contact }: FooterProps) {
	return (
		<footer className='mt-8 overflow-hidden bg-(--green)'>
			<div
				id='curve'
				className='h-12 bg-(--background)'
				style={{ borderRadius: '0 0 100% 100%' }}
			/>
			<section
				id='menu'
				className='mx-12 p-8 flex items-baseline justify-around relative flex-wrap md:flex-nowrap md:p-8'
			>
				<div className='mx-0 md:mx-4 flex-grow-0 text-center md:text-left'>
					<h1 className='text-3xl font-bold'>ITea Lab</h1>
					<p>Where tech meets its quali-tea</p>
				</div>
				<div className='mx-0 md:mx-4 flex-grow-0 text-center md:text-left'>
					<h2 className='text-2xl font-bold'>Explore</h2>
					{explore.map((item) => (
						<p>
							<a href={item.href}>{item.name}</a>
						</p>
					))}
				</div>
				<div className='mx-0 md:mx-4 flex-grow-0 text-center md:text-left'>
					<h2 className='text-2xl font-bold'>Community</h2>
					{community.map((item) => (
						<p>
							<a href={item.href} target='_blank' rel='noopener noreferrer'>
								{item.name}
							</a>
						</p>
					))}
				</div>
				<div className='mx-0 md:mx-4 flex-grow-0 text-center md:text-left w-full md:w-3/5'>
					<h2 className='text-2xl font-bold'>Contact</h2>
					<p>
						<a href={`mailto:${contact.email}`}>{contact.email}</a>
					</p>
					<p id='address' className='md:w-3/5'>{contact.address}</p>
				</div>
				<div
					id='leaf'
					className='static md:absolute md:bottom-0 md:-right-40 md:w-80 md:h-60 md:overflow-hidden md:z-0'
				>
					<Leaf />
				</div>
			</section>
		</footer>
	);
}
