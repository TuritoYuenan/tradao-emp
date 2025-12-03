import { FooterProps } from '$lib/props.ts';
import { Leaf } from './Leaf.tsx';

export function Footer({ explore, community, contact }: FooterProps) {
	return (
		<footer className='bottom l grid'>
			<div className='s12 m3'>
				<h1 className='small'>ITea Lab</h1>
				<p>Where tech meets its quali-tea</p>
			</div>
			<div className='s12 m3'>
				<h2 className='small'>Explore</h2>
				{explore.map((item) => (
					<p>
						<a href={item.href}>{item.name}</a>
					</p>
				))}
			</div>
			<div className='s12 m3'>
				<h2 className='small'>Community</h2>
				{community.map((item) => (
					<p>
						<a href={item.href} target='_blank' rel='noopener noreferrer'>
							{item.name}
						</a>
					</p>
				))}
			</div>
			<div className='s12 m3'>
				<h2 className='small'>Contact</h2>
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
		</footer>
	);
}
