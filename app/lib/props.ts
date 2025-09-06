import { Tables } from './models.ts';

export interface EventRegistrationProps {
	eventID: string;
	name: string;
	email: string;
	year: string;
	field: string;
	major: string;
	confirm: boolean;
}

export interface TicketLookupProps {
	lookup: Tables<'tickets_with_event_details'>;
	saveURL: string;
}
