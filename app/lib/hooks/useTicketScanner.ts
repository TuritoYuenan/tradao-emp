import { useSignal } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';
import jsQR_module from 'jsqr';
import * as yup from 'yup';
import { Tables } from '$lib/models.ts';

const jsQR = jsQR_module.default || jsQR_module;

export function useTicketScanner() {
	const isLoading = useSignal(false);
	const error = useSignal<string | null>(null);

	const ticket = useSignal<Tables<'event_tickets'> | null>(null);
	const qrResult = useSignal<string | null>(null);

	const debounceTimeout = useRef<number | null>(null);
	const lastScannedCode = useRef<string | null>(null);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

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
			error.value = `Invalid ticket QR code: '${data}'.`;
			return;
		}

		isLoading.value = true;
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
			.finally(() => isLoading.value = false);
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
	}

	function isCameraSupported() {
		return (
			typeof window !== 'undefined' && navigator.mediaDevices &&
			'getUserMedia' in navigator.mediaDevices
		);
	}

	useEffect(() => {
		let animationId: number;

		if (isCameraSupported()) {
			startCamera();
			animationId = requestAnimationFrame(function scan() {
				scanQRCode();
				animationId = requestAnimationFrame(scan);
			});
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

	return {
		videoRef,
		canvasRef,
		qrResult,
		error,
		ticket,
		isLoading,
	};
}
