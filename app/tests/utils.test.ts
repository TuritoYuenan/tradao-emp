import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';

import * as utils from '$lib/utils.ts';

describe('Utils', () => {
	it('formats dates correctly', () => {
		const date = new Date('2024-06-15T13:45:30Z');
		const formatted = utils.formatDate(date);
		expect(formatted).toBe('15 June 2024, 20:45');
	});

	it('serialises dates to ISO strings', () => {
		const date = new Date('2024-06-15T13:45:30Z');
		const isoString = utils.serialiseDate(date);
		expect(isoString).toBe('2024-06-15T13:45:30.000Z');
	});

	it('searches through an array of objects', () => {
		const data = [
			{ name: 'Alice Johnson', email: 'ajohnson@mail.com' },
			{ name: 'Bob Smith', email: 'bsmith@mail.com' },
			{ name: 'Charlie Brown', email: 'cbrown@mail.com' },
		];
		const results = utils.search(data, 'smith', ['name', 'email']);
		expect(results).toEqual([{ name: 'Bob Smith', email: 'bsmith@mail.com' }]);
	});

	it('determines if an event is upcoming', () => {
		const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day in the future
		const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day in the past

		expect(utils.isEventUpcoming(futureDate)).toBe(true);
		expect(utils.isEventUpcoming(pastDate)).toBe(false);
	});

	it('generates error response objects', () => {
		const errorResponse = utils.errorResponse(404, 'Not Found');
		expect(errorResponse.status).toBe(404);

		errorResponse.text().then((body) => {
			const data = JSON.parse(body);
			expect(data).toEqual({ error: 'Not Found' });
		});
	});
});
