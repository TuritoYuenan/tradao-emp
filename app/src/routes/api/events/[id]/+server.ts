import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { errorResponse } from "$lib/utils";

export const PUT: RequestHandler = async (
	{ params: { id }, request, locals: { supabase } },
) => {
	const eventData = await request.json();

	// Update event in the database
	const { error: updateError } = await supabase
		.from("community_events")
		.update(eventData)
		.eq("id", id);

	if (updateError) {
		return errorResponse(
			500,
			`Failed to update event: ${updateError.message}`,
		);
	}

	return json({ message: "Event updated successfully" });
};

export const DELETE: RequestHandler = async (
	{ params: { id }, locals: { supabase } },
) => {
	// Delete event from the database
	const { error: deleteError } = await supabase
		.from("community_events")
		.delete()
		.eq("id", id);

	if (deleteError) {
		return errorResponse(
			500,
			`Failed to delete event: ${deleteError.message}`,
		);
	}

	// Optionally, delete associated image from storage
	const filePath = `${id}`;
	const { error: storageError } = await supabase
		.storage
		.from("assets")
		.remove([filePath]);

	if (storageError) {
		// Log the error but don't fail the entire request
		console.error(
			`Failed to delete image from storage: ${storageError.message}`,
		);
	}

	return json({ message: "Event deleted successfully" });
};
