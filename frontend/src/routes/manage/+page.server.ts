import supabase from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data, error: err } = await supabase
		.functions.invoke('manage-tickets');

	if (err) error(500, err.message);
	return { data };
};
