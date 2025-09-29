import * as yup from 'yup';
import { Handlers } from '$fresh/server.ts';
import { Database } from '$lib/models.ts';
import { supabase } from '$lib/supabase.ts';
import { errorResponse } from '$lib/utils.ts';
import { eventRegistrationSchema } from '$lib/validation.ts';

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
		eventID: form.get('eventID') as string || '',
		name: form.get('name') as string || '',
		email: form.get('email') as string || '',
		year: form.get('year') as Database['public']['Enums']['academic_year'] || '',
		field: form.get('field') as Database['public']['Enums']['field_of_study'] || '',
		major: form.get('major') as string || '',
		confirm: form.get('confirm') === 'on',
	};
}

export const handler: Handlers<RegistrationFormProps> = {
	async POST(req, _ctx) {
		const form = await req.formData();
		const registrationData = formToObject(form);

		try {
			await eventRegistrationSchema.validate(registrationData, { abortEarly: false });
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				return new Response(JSON.stringify({ errors: error.errors }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		}

		const { data: ticketID, error } = await supabase.rpc('create_event_ticket', {
			p_event_id: registrationData.eventID,
			p_name: registrationData.name,
			p_email: registrationData.email,
			p_academic_year: registrationData.year as Database['public']['Enums']['academic_year'],
			p_field_of_study: registrationData.field as Database['public']['Enums']['field_of_study'],
			p_major: registrationData.major,
			p_participate: registrationData.confirm,
		});

		if (error) return errorResponse(500, `Database error: ${error.message}`);
		if (!ticketID) return errorResponse(500, 'Database error: Ticket cannot be identified');

		return new Response(
			JSON.stringify({ ticketID }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	},
};
