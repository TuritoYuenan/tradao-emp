import { useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { formatDate } from '$lib/utils.ts';

export function TextClock() {
	const time = useSignal(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			time.value = new Date();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<span>
			<i className='prefix-icon'>schedule</i>
			<span>
				{formatDate(time.value, {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				})} &bull; {formatDate(time.value, {
					weekday: 'short',
					day: '2-digit',
					month: 'short',
				})}
			</span>
		</span>
	);
}
