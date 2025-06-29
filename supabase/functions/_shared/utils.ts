export function errorResponse(message: string, status: number = 500) {
	console.error("%d: %s", status, message);
	return new Response(
		JSON.stringify({ error: message }),
		{ status, headers: { "Content-Type": "application/json" } }
	);
}
