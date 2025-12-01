import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { ValidationError } from 'yup';
import { eventRegistrationSchema } from '$lib/validation.ts';

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
				])
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
				])
			);
		}
	});
});
