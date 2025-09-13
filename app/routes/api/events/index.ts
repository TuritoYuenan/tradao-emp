import { TablesInsert } from '$lib/models.ts';
import { Handlers } from '$fresh/server.ts';
import { supabase } from '$lib/supabase.ts';
import { errorResponse } from '$lib/utils.ts';

interface CommunityEventProps extends Omit<TablesInsert<'community_events'>, 'image'> {
	imageFile: File;
}

export const handler: Handlers<CommunityEventProps> = {
	async POST(req, _ctx) {
		const formData = await req.formData();
		const eventForm: CommunityEventProps = {
			title: formData.get('title')?.toString() || '',
			description: formData.get('description')?.toString() || '',
			start_time: formData.get('start_time')?.toString() || '',
			end_time: formData.get('end_time')?.toString() || '',
			location: formData.get('location')?.toString() || '',
			imageFile: formData.get('imageFile') as File,
		};

		const { status, error } = await supabase
			.from('community_events')
			.upsert([eventForm]);

		if (error) return errorResponse(status, error.message);

		return new Response(JSON.stringify({ eventID: 'a' }), {
			status, headers: { 'Content-Type': 'application/json' },
		});
	},

	async GET(req, _ctx) {
		const url = new URL(req.url);
		const upcoming = url.searchParams.get('upcoming') === 'true';

		const query = upcoming
			? supabase
				.from('upcoming_events')
				.select('*')
				.order('start_time', { ascending: true })
			: supabase
				.from('community_events')
				.select('*')
				.order('start_time', { ascending: true });

		const { data, error } = await query;

		if (error) return errorResponse(500, error.message);

		return new Response(JSON.stringify({ success: true, events: data }), {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
