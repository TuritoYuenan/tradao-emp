import { json } from '@sveltejs/kit';
import { errorResponse } from '$lib/utils';
import { eventRegistrationSchema } from '$lib/validation';
import type { RequestHandler } from './$types';
import type { Database } from '$lib/models';
import * as yup from 'yup';

interface RegistrationFormProps {
	eventID: string;
	name: string;
	email: string;
	year: Database['public']['Enums']['academic_year'] | '';
	field: Database['public']['Enums']['field_of_study'] | '';
	major: string;
	confirm: boolean;
}

function formToObject(form: FormData): RegistrationFormProps {
	return {
		eventID: (form.get('eventID') as string) || '',
		name: (form.get('name') as string) || '',
		email: (form.get('email') as string) || '',
		year: (form.get('year') as Database['public']['Enums']['academic_year']) || '',
		field: (form.get('field') as Database['public']['Enums']['field_of_study']) || '',
		major: (form.get('major') as string) || '',
		confirm: form.get('confirm') === 'on'
	};
}

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const form = await request.formData();
	const registrationData = formToObject(form);

	try {
		await eventRegistrationSchema.validate(registrationData, { abortEarly: false });
	} catch (e) {
		if (e instanceof yup.ValidationError) return errorResponse(400, e.errors);
	}

	const { data: ticketID, error } = await supabase.rpc('create_event_ticket', {
		p_event_id: registrationData.eventID,
		p_name: registrationData.name,
		p_email: registrationData.email,
		p_academic_year: registrationData.year as Database['public']['Enums']['academic_year'],
		p_field_of_study: registrationData.field as Database['public']['Enums']['field_of_study'],
		p_major: registrationData.major,
		p_participate: registrationData.confirm
	});

	if (error) return errorResponse(500, `Database error: ${error.message}`);
	if (!ticketID) return errorResponse(500, 'Database error: Ticket cannot be identified');

	return json({ ticketID }, { status: 200 });
};
