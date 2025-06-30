/**
 * Format a date string into a more readable format.
 * @param date Date string or object to format
 * @returns Formatted date string in "dd MMM yyyy, HH:mm" format
 */
export function formatDate(date: string | Date): string {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};
	return new Date(date).toLocaleString("en-AU", options);
}
