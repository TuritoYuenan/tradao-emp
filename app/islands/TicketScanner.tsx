import jsQR from 'jsqr';
import { useEffect, useRef } from 'preact/hooks';
import * as yup from 'yup';
import { Tables } from '$lib/models.ts';
import { useSignal } from '@preact/signals';

export function TicketScanner() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const debounceTimeout = useRef<number | null>(null);
	const lastScannedCode = useRef<string | null>(null);
	const qrResult = useSignal<string | null>(null);
	const error = useSignal<string | null>(null);
	const ticket = useSignal<Tables<'event_tickets'> | null>(null);
	const loading = useSignal(false);

	async function startCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' },
			});
			if (videoRef.current) videoRef.current.srcObject = stream;
		} catch {
			error.value = 'Camera access denied or not available.';
		}
	}

	function handleQRResult(data: string) {
		error.value = null;
		ticket.value = null;
		qrResult.value = data;

		// Ignore empty strings (no QR code detected)
		if (!data || data.trim() === '') return;

		// Validate UUID
		if (!yup.string().uuid().isValidSync(data)) {
			error.value = `Scanned code '${data}' is not a valid UUID format.`;
			return;
		}

		loading.value = true;
		fetch(`/api/tickets/${data}`)
			.then(async (res) => {
				if (!res.ok) {
					const err = await res.text();
					throw new Error(err);
				}
				return res.json();
			})
			.then((result) => ticket.value = result.ticket)
			.catch((err) => error.value = 'Ticket not found or error: ' + err.message)
			.finally(() => loading.value = false);
	}

	useEffect(() => {
		let animationId: number;

		function scanQRCode() {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			if (video && canvas) {
				const ctx = canvas.getContext('2d');
				if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
					ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					const code = jsQR(imageData.data, canvas.width, canvas.height);
					if (code && code.data !== lastScannedCode.current) {
						lastScannedCode.current = code.data;
						// Debounce QR scan
						if (debounceTimeout.current) {
							clearTimeout(debounceTimeout.current);
						}
						debounceTimeout.current = globalThis.setTimeout(() => {
							handleQRResult(code.data);
						}, 800); // 800ms debounce
					}
				}
			}
			animationId = requestAnimationFrame(scanQRCode);
		}

		if (
			typeof window !== 'undefined' && navigator.mediaDevices &&
			'getUserMedia' in navigator.mediaDevices
		) {
			startCamera();
			animationId = requestAnimationFrame(scanQRCode);
		} else {
			error.value = 'Camera not supported in this environment.';
		}

		return () => {
			cancelAnimationFrame(animationId);
			if (videoRef.current && videoRef.current.srcObject) {
				const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
				tracks.forEach((track) => track.stop());
			}
			qrResult.value = null;
			ticket.value = null;
			error.value = null;
			if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
		};
	}, []);

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
				{loading.value && <LoadingCard />}
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
