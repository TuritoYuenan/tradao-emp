import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id }: { id: number } = params;
	return { id };
};
