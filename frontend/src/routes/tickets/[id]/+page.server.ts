import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, fetch }: {
	params: { id: string }, fetch: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	}
}) => {
	const response = await fetch(`/api/ticket?ticketID=${encodeURIComponent(params.id)}`);

	if (!response.ok) error(response.status, await response.text());
	const data = await response.json();
	return { ...data };
};
