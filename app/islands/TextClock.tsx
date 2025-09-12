import { useEffect, useState } from 'preact/hooks';
import { formatDate } from '$lib/utils.ts';

export default function TextClock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<span>
			<span className='material-symbols-rounded relative top-[0.3rem]'>schedule</span>{' '}
			<span>
				{formatDate(time, { hour: '2-digit', minute: '2-digit', hour12: false })} &bull;{' '}
				{formatDate(time, { weekday: 'short', day: '2-digit', month: 'short' })}
			</span>
		</span>
	);
}
