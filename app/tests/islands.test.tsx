import { beforeAll, describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';

import { App } from 'fresh';
import { TextClock } from '$islands/TextClock.tsx';
import { EventRegistrationForm } from '$islands/EventRegistrationForm.tsx';

describe('Text Clock island', () => {
	let result: string;
	const app = new App()
		.get('/text-clock', (ctx) => ctx.render(<TextClock />))
		.handler();

	beforeAll(async () => {
		const req = new Request('http://localhost/text-clock');
		const res = await app(req);
		result = await res.text();
	});

	it('renders the clock icon correctly', () => {
		expect(result).toContain('schedule');
	});

	it('renders the time in HH:MM format', () => {
		const timeRegex = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/;
		const match = result.match(timeRegex);
		expect(match).not.toBeNull();
	});

	it('renders the date in "Day, DD Mon" format', () => {
		const dateRegex =
			/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;
		const match = result.match(dateRegex);
		expect(match).not.toBeNull();
	});
});

describe('Event Registration Form island', () => {
	let result: string;
	const app = new App()
		.get(
			'/event-registration',
			(ctx) => ctx.render(<EventRegistrationForm eventID='5023b5d2-51cf-4424-983f-fef147dad29f' />),
		)
		.handler();

	beforeAll(async () => {
		const req = new Request('http://localhost/event-registration');
		const res = await app(req);
		result = await res.text();
	});

	it('renders the form with all required fields', () => {
		expect(result).toContain('form');
		expect(result).toContain('name="name" type="text"');
		expect(result).toContain('name="email" type="email"');
		expect(result).toContain('button type="submit"');
	});
});
