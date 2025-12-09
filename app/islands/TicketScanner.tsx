import { useTicketScanner } from '$lib/useTicketScanner.ts';

export function TicketScanner() {
	const { videoRef, canvasRef, qrResult, error, ticket, isLoading } = useTicketScanner();

	return (
		<div className='grid'>
			<section className='s12 m6'>
				<article className='no-padding'>
					<video
						ref={videoRef}
						autoPlay
						playsInline
						style={{ aspectRatio: '16 / 9' }}
						aria-label='Camera feed'
					/>
					<canvas ref={canvasRef} style={{ display: 'none' }} />
				</article>
				{qrResult.value && <p>Scanned: {qrResult.value}</p>}
				{isLoading.value && <LoadingCard />}
				{error.value && <ErrorCard error={error.value} />}
				{ticket.value && <pre>{JSON.stringify(ticket.value, null, 2)}</pre>}
			</section>

			<article className='s12 m6'>
				<h2 className='small'>Checked in participants</h2>
			</article>
		</div>
	);
}

const LoadingCard = () => (
	<article className='tertiary'>
		<p>Checking ticket...</p>
	</article>
);

const ErrorCard = ({ error }: { error: string }) => (
	<article className='error large-text'>
		<i>error</i> <strong>Error:</strong> {error}
	</article>
);
