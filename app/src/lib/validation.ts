import * as yup from 'yup';
import { Constants } from './models';

/**
 * Yup validation schema for event registration form.
 */
export const eventRegistrationSchema = yup.object({
	eventID: yup.string()
		.trim()
		.required('Event ID is required')
		.test('uuid-check', 'Event ID must be a valid UUID version 4', (value) => {
			if (!value) return true;
			return yup.string().uuid().isValidSync(value);
		}),

	name: yup.string()
		.trim()
		.required('Name is required')
		.test('name-check', 'Name must contain only letters and spaces', (value) => {
			if (!value) return true;
			return /^[a-zA-Z\s]+$/.test(value);
		}),

	email: yup.string()
		.trim()
		.required('Email is required')
		.test('email-check', 'Invalid email format', (value) => {
			if (!value) return true;
			return yup.string().email().isValidSync(value);
		}),

	year: yup.string()
		.trim()
		.required('Academic year is required')
		.test('year-check', 'Invalid academic year', (value) => {
			if (!value) return true;
			return yup.string().oneOf(Constants.public.Enums.academic_year).isValidSync(value);
		}),

	field: yup.string()
		.trim()
		.required('Field of study is required')
		.test('field-check', 'Invalid field of study', (value) => {
			if (!value) return true;
			return yup.string().oneOf(Constants.public.Enums.field_of_study).isValidSync(value);
		}),

	major: yup.string()
		.trim()
		.required('Major is required'),

	confirm: yup.boolean()
		.required('Confirmation is required')
		.oneOf([true], 'Confirmation is required'),
});

/**
 * Yup validation schema for event creation form.
 */
export const eventCreationSchema = yup.object({
	title: yup.string()
		.trim()
		.required('Event title is required'),

	start_time: yup.string()
		.trim()
		.required('Event start time is required')
		.datetime('Start time must be of valid format'),

	end_time: yup.string()
		.trim()
		.required('Event end time is required')
		.datetime('End time must be of valid format')
		.test('end-after-start', 'End time must be after start time', function (value) {
			const { start_time } = this.parent;
			if (!value || !start_time) return true;
			return new Date(value) > new Date(start_time);
		}),

	location: yup.string()
		.trim()
		.required('Event location is required'),

	host_name: yup.string()
		.trim()
		.required('Host name is required'),

	host_email: yup.string()
		.trim()
		.required('Host email is required')
		.email('Invalid email format'),

	category: yup.string()
		.trim()
		.required('Event category is required'),

	imageFile: yup.mixed()
		.notRequired()
		.test('is-image', 'Image file must be JPEG/PNG/GIF and under 5MB.', (value) => {
			if (!value) return true; // Image is optional
			if (!(value instanceof File)) return false;
			const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
			const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
			return validTypes.includes(value.type) && value.size <= maxSizeInBytes;
		}),

	description: yup.string()
		.trim()
		.notRequired(),
});
