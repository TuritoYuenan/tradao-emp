export default function Banner({ title, description }: { title: string; description?: string }) {
	return (
		<header
			className='
				m-4 mb-8 p-12 text-center rounded-2xl
				shadow-xl relative bg-[--green] text-[--dark-green]'
			style={{ borderRadius: '1rem 8rem' }}
		>
			<div
				id='leaf'
				className='absolute aspect-square z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[--background]'
				style={{ height: 'calc(100% - 2rem)', borderRadius: '0 100%' }}
			>
			</div>
			<h1 className='text-4xl font-bold relative z-10'>{title}</h1>
			{description && <p className='relative z-10'>{description}</p>}
		</header>
	);
}
