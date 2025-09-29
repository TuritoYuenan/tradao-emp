import { Tables } from './models.ts';

export interface TicketLookupProps {
	lookup: Tables<'tickets_with_event_details'>;
	saveURL: string;
}
