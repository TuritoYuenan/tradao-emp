import { Tables } from './models.ts';

export interface NavigationProps {
	menuItems: {
		name: string;
		href: string;
		icon: string;
		external: boolean;
	}[];
}

export interface FooterProps {
	explore: {
		name: string;
		href: string;
	}[];

	community: {
		name: string;
		href: string;
	}[];

	contact: {
		email: string;
		address: string;
	};
}

export interface BannerProps {
	title: string;
	description?: string;
}

export interface EventFeedProps {
	events: Tables<'upcoming_events'>[];
}

export interface EventCardProps {
	event: Tables<'upcoming_events'>;
}

export interface LoginFormProps {
	redirectTo?: string;
}

export interface LeafProps {
	fill?: string;
}

export interface TicketLookupProps {
	lookup: Tables<'tickets_with_event_details'>;
	saveURL: string;
}
