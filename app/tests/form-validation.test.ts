import { ValidationError } from 'yup';
import { eventRegistrationSchema } from '$lib/validation.ts';
import { assertArrayIncludes } from '$std/assert/assert_array_includes.ts';
import { assertEquals } from '$std/assert/assert_equals.ts';
import { assertGreater } from '$std/assert/assert_greater.ts';

Deno.test('valid data passes validation', async () => {
	const validForm = {
		eventID: '598bb954-6f80-4664-ae6d-24ccc035a630',
		name: 'John Doe',
		email: 'jdoe@mail.com',
		year: 'Junior',
		field: 'comp-sci',
		major: 'Software Engineering',
		confirm: true,
	};

	const result = await eventRegistrationSchema.isValid(validForm);
	assertEquals(result, true);
});

Deno.test('empty data returns errors', async () => {
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

		assertGreater(error.errors.length, 0);
		assertArrayIncludes(error.errors, [
			'Event ID is required',
			'Email is required',
			'Academic year is required',
			'Confirmation is required',
			'Field of study is required',
			'Major is required',
			'Name is required',
		]);
	}
});

Deno.test('invalid data return errors', async () => {
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

		assertGreater(error.errors.length, 0);
		assertArrayIncludes(error.errors, [
			'Event ID must be a valid UUID version 4',
			'Invalid email format',
			'Invalid academic year',
			'Invalid field of study',
		]);
	}
});
