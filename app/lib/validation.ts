import * as uuid from '@std/uuid';
import { Constants } from './models.ts';
import { EventRegistrationProps } from './props.ts';

function validateUUID(id: string) {
	return uuid.validate(id) && uuid.version(id) === 4;
}

function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function validateAcademicYear(year: string) {
	return Constants.public.Enums.academic_year.includes(year as any);
}

function validateFieldOfStudy(field: string) {
	return Constants.public.Enums.field_of_study.includes(field as any);
}

function validateEventTime(start: string | Date, end: string | Date) {
	const startTime = new Date(start);
	const endTime = new Date(end);
	return startTime < endTime;
}

export function validate(form: EventRegistrationProps) {
	const errors: string[] = [];

	// Field exists
	if (!form.eventID.trim()) errors.push('Event ID is required');
	if (!form.name.trim()) errors.push('Name is required');
	if (!form.email.trim()) errors.push('Email is required');
	if (!form.year.trim()) errors.push('Academic year is required');
	if (!form.field.trim()) errors.push('Field of study is required');
	if (!form.major.trim()) errors.push('Major is required');
	if (!form.confirm) errors.push('Confirmation is required');

	// Field is in valid format
	if (form.eventID && !validateUUID(form.eventID)) errors.push('Event ID must be a valid UUID version 4');
	if (form.email && !validateEmail(form.email)) errors.push('Invalid email format');
	if (form.year && !validateAcademicYear(form.year)) errors.push('Invalid academic year');
	if (form.field && !validateFieldOfStudy(form.field)) errors.push('Invalid field of study');

	return errors;
}
