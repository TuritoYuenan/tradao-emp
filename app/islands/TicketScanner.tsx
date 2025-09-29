import jsQR from 'jsqr';
import { useEffect, useRef, useState } from 'preact/hooks';
import * as yup from 'yup';
import { Tables } from '$lib/models.ts';

export default function CameraFeed() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const debounceTimeout = useRef<number | null>(null);
	const lastScannedCode = useRef<string | null>(null);
	const [qrResult, setQrResult] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [ticket, setTicket] = useState<Tables<'event_tickets'> | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let animationId: number;

		async function startCamera() {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
				if (videoRef.current) videoRef.current.srcObject = stream;
			} catch {
				setError('Camera access denied or not available.');
			}
		}

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

		function handleQRResult(data: string) {
			setError(null);
			setTicket(null);
			setQrResult(data);

			// Ignore empty strings (no QR code detected)
			if (!data || data.trim() === '') return;

			// Validate UUID
			if (!yup.string().uuid().isValidSync(data)) {
				setError(`Scanned code '${data}' is not a valid UUID format.`);
				return;
			}

			setLoading(true);
			fetch(`/api/tickets/${data}`)
				.then(async (res) => {
					if (!res.ok) {
						const err = await res.text();
						throw new Error(err);
					}
					return res.json();
				})
				.then((result) => setTicket(result.ticket))
				.catch((err) => setError('Ticket not found or error: ' + err.message))
				.finally(() => setLoading(false));
		}

		if (typeof window !== 'undefined' && navigator.mediaDevices && 'getUserMedia' in navigator.mediaDevices) {
			startCamera();
			animationId = requestAnimationFrame(scanQRCode);
		} else {
			setError('Camera not supported in this environment.');
		}

		return () => {
			cancelAnimationFrame(animationId);
			if (videoRef.current && videoRef.current.srcObject) {
				const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
				tracks.forEach((track) => track.stop());
			}
			setQrResult(null);
			setTicket(null);
			setError(null);
			if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
		};
	}, []);

	return (
		<article>
			<video
				ref={videoRef}
				autoPlay
				playsInline
				className='w-fill mx-auto bg-black rounded-lg'
				aria-label='Camera feed'
			/>
			<canvas ref={canvasRef} className='hidden w-fill mx-auto bg-black rounded-lg' />
			{qrResult && <p class='mt-4 p-2 bg-blue-100 rounded'>Scanned: {qrResult}</p>}
			{loading && <p class='mt-4 p-2 bg-yellow-100 rounded'>Checking ticket...</p>}
			{error && <p class='mt-4 p-2 bg-red-100 rounded'>{error}</p>}
			{ticket && (
				<div class='mt-4 p-2 bg-green-100 rounded'>
					<h3 class='font-bold'>Ticket Found</h3>
					<pre class='text-xs'>{JSON.stringify(ticket, null, 2)}</pre>
				</div>
			)}
		</article>
	);
}
