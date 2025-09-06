import { validate } from '$lib/utils.ts';
import { assertEquals } from '$std/assert/assert_equals.ts';
import { assertArrayIncludes } from '$std/assert/assert_array_includes.ts';
import { assertGreater } from '$std/assert/assert_greater.ts';

Deno.test('validate form data', async (t) => {
	await t.step('valid data passes validation', () => {
		const validForm = {
			eventID: '598bb954-6f80-4664-ae6d-24ccc035a630',
			name: 'John Doe',
			email: 'jdoe@mail.com',
			year: 'Junior',
			field: 'comp-sci',
			major: 'Software Engineering',
			confirm: true,
		};

		const errors = validate(validForm);
		assertEquals(errors.length, 0);
	});

	await t.step('empty data returns errors', () => {
		const invalidForm = {
			eventID: '',
			name: '   ',
			email: '',
			year: '',
			field: '',
			major: '   ',
			confirm: false,
		};

		const errors = validate(invalidForm);
		assertGreater(errors.length, 0);
		assertArrayIncludes(errors, [
			'Event ID is required',
			'Email is required',
			'Academic year is required',
			'Confirmation is required',
			'Field of study is required',
			'Major is required',
			'Name is required',
		]);
	});

	await t.step('invalid data return errors', () => {
		const invalidForm = {
			eventID: '12345',
			name: 'John Doe',
			email: 'invalid-email',
			year: 'Master',
			field: 'finance',
			major: 'Software Engineering',
			confirm: true,
		};

		const errors = validate(invalidForm);
		assertGreater(errors.length, 0);
		assertArrayIncludes(errors, [
			'Event ID must be a valid UUID version 4',
			'Invalid email format',
			'Invalid academic year',
			'Invalid field of study',
		]);
	});
});
