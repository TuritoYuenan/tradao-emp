/**
 * Utility function to create an error response for HTTP requests.
 * @param message Error message
 * @param status Status code, defaults to 500
 * @returns HTTP Response with error message
 */
export function errorResponse(status: number = 500, message: string) {
	console.error("%d: %s", status, message);
	return new Response(
		JSON.stringify({ error: message }),
		{ status, headers: { "Content-Type": "application/json" } }
	);
}
