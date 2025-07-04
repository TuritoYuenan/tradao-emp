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

/**
 * Utility function to serialise a date into an ISO string.
 * @param date Date object or string to be serialised
 * @returns ISO string representation of the date
 */
export function serialiseDate(date: Date | string): string {
	return new Date(date).toISOString();
}
