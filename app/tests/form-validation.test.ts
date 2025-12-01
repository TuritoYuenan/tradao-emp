import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';

import { ValidationError } from 'yup';
import { eventCreationSchema, eventRegistrationSchema } from '$lib/validation.ts';

describe('Event Registration Form Validation', () => {
	it('valid data passes validation', async () => {
		const validForm = {
			eventID: '598bb954-6f80-4664-ae6d-24ccc035a630',
			name: 'John Doe',
			email: 'jdoe@mail.com',
			year: 'Junior',
			field: 'Computer Science',
			major: 'Software Engineering',
			confirm: true,
		};

		const result = await eventRegistrationSchema.isValid(validForm);
		expect(result).toBe(true);
	});

	it('empty data returns errors', async () => {
		const invalidForm = {
			eventID: '   ',
			name: '   ',
			email: '   ',
			year: '   ',
			field: '   ',
			major: '   ',
			confirm: false,
		};

		try {
			await eventRegistrationSchema.validate(invalidForm, { abortEarly: false });
		} catch (error) {
			if (error instanceof ValidationError === false) throw new Error('Expected a ValidationError');

			expect(error.errors.length).toBeGreaterThan(0);
			expect(error.errors).toEqual(
				expect.arrayContaining([
					'Event ID is required',
					'Email is required',
					'Academic year is required',
					'Confirmation is required',
					'Field of study is required',
					'Major is required',
					'Name is required',
				]),
			);
		}
	});

	it('invalid data return errors', async () => {
		const invalidForm = {
			eventID: '12345',
			name: 'John Doe',
			email: 'invalid-email',
			year: 'Master',
			field: 'finance',
			major: 'Software Engineering',
			confirm: true,
		};

		try {
			await eventRegistrationSchema.validate(invalidForm, { abortEarly: false });
		} catch (error) {
			if (error instanceof ValidationError === false) throw new Error('Expected a ValidationError');

			expect(error.errors.length).toBeGreaterThan(0);
			expect(error.errors).toEqual(
				expect.arrayContaining([
					'Event ID must be a valid UUID version 4',
					'Invalid email format',
					'Invalid academic year',
					'Invalid field of study',
				]),
			);
		}
	});
});

describe('Event Creation Form Validation', () => {
	it('valid data passes validation', async () => {
		const validForm = {
			title: 'Tech Conference 2023',
			start_time: '2023-11-15T09:00:00Z',
			end_time: '2023-11-15T17:00:00Z',
			location: 'New York City',
			host_name: 'John Smith',
			host_email: 'john.smith@example.com',
			category: 'Technology',
			imageFile: undefined,
			description: 'An exciting tech conference.',
		};

		const result = await eventCreationSchema.isValid(validForm);
		expect(result).toBe(true);
	});

	it('empty data returns errors', async () => {
		const invalidForm = {
			title: '   ',
			start_time: '   ',
			end_time: '   ',
			location: '   ',
			host_name: '   ',
			host_email: '   ',
			category: '   ',
			imageFile: undefined,
			description: '   ',
		};

		try {
			await eventCreationSchema.validate(invalidForm, { abortEarly: false });
		} catch (error) {
			if (error instanceof ValidationError === false) throw new Error('Expected a ValidationError');

			expect(error.errors.length).toBeGreaterThan(0);
			expect(error.errors).toEqual(
				expect.arrayContaining([
					'Event title is required',
					'Event start time is required',
					'Event end time is required',
					'Event location is required',
					'Event category is required',
					'Host name is required',
					'Host email is required',
				]),
			);
		}
	});

	it('invalid data return errors', async () => {
		const invalidForm = {
			title: 'Tech Conference 2023',
			start_time: 'invalid-date',
			end_time: '2023-11-15T17:00:00Z',
			location: 'New York City',
			host_name: 'John Smith',
			host_email: 'invalid-email',
			category: 'Unknown Category',
			imageFile: undefined,
			description: 'An exciting tech conference.',
		};

		try {
			await eventCreationSchema.validate(invalidForm, { abortEarly: false });
		} catch (error) {
			if (error instanceof ValidationError === false) throw new Error('Expected a ValidationError');

			expect(error.errors.length).toBeGreaterThan(0);
			expect(error.errors).toEqual(
				expect.arrayContaining([
					'Start time must be of valid format',
					'Start time must be of valid format',
					'End time must be after start time',
					'Invalid email format',
				]),
			);
		}
	});
});
