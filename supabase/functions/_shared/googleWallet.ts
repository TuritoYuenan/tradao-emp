// Import the Google Auth library for authentication
import { GoogleAuth } from "npm:google-auth-library";
import { log } from "node:console";

const issuerId = Deno.env.get("GOOGLE_ISSUER_ID") || "1234567890"; // Replace with your issuer ID
const classId = `${issuerId}.tradao_event`;
const baseUrl = "https://example.com/tickets"; // Replace with your base URL for tickets

const client = new GoogleAuth({
	scopes: 'https://www.googleapis.com/auth/wallet_object.issuer',
	credentials: {
		client_email: Deno.env.get("GOOGLE_CLIENT_EMAIL") || "",
		private_key: Deno.env.get("GOOGLE_PRIVATE_KEY") || "",
	},
});

// Pass Class Object (only needs to be created once)
export const eventTicketClass = {
	id: classId,
	issuerName: "ITea Lab",
	eventName: {
		defaultValue: {
			language: "en-US",
			value: "Community Event"
		}
	},
	reviewStatus: "UNDER_REVIEW", // or "APPROVED" after Google review
	logo: {
		sourceUri: {
			uri: "https://tradao-emp.pages.dev/logo.png"
		}
	},
	homepageUri: {
		uri: "https://tradao-emp.pages.dev",
		description: "Tradao Event Management Platform"
	},
	multipleDevicesAndHoldersAllowedStatus: "ONE_USER_ALL_DEVICES"
};

// Function to create a Pass Object for a specific ticket
export function createEventTicketObject(params: {
	ticketId: string; // UUID from event_tickets.id
	event: {
		title: string;
		description?: string;
		start_time: string; // ISO string
		end_time: string;   // ISO string
		location?: string;
		host?: string;
		image?: string;
	};
	attendee: {
		name: string;
		email: string;
		academic_year: string;
		field_of_study: string;
		major: string;
	};
}) {
	const objectId = `${issuerId}.${params.ticketId.replace(/-/g, '')}`; // Google requires [issuerId].[alphanumeric]
	return {
		id: objectId,
		classId: classId,
		state: "ACTIVE",
		heroImage: params.event.image
			? { sourceUri: { uri: params.event.image } }
			: undefined,
		barcode: {
			type: "QR_CODE",
			value: params.ticketId
		},
		ticketHolderName: params.attendee.name,
		ticketNumber: params.ticketId,
		eventName: {
			defaultValue: {
				language: "en-US",
				value: params.event.title
			}
		},
		eventDateTime: {
			start: params.event.start_time,
			end: params.event.end_time
		},
		locations: params.event.location
			? [{
					location: {
						description: params.event.location
					}
				}]
			: undefined,
		textModulesData: [
			{
				header: "Description",
				body: params.event.description || ""
			},
			{
				header: "Host",
				body: params.event.host || ""
			},
			{
				header: "Academic Year",
				body: params.attendee.academic_year
			},
			{
				header: "Field of Study",
				body: params.attendee.field_of_study
			},
			{
				header: "Major",
				body: params.attendee.major
			}
		],
		// Optionally add more fields as needed
		// See: https://developers.google.com/wallet/tickets/events/reference/rest/v1/eventticketobject
	};
}

async function createPassClass() {
	const passClass = {
		id: classId,
		issuer: "1234567890", // Replace with your issuer ID
		name: "Event Ticket",
		description: "Ticket for the event",
		organizationName: "Example Organization",
		heroImage: {
			source: "https://example.com/images/hero.png", // Replace with your image URL
			contentDescription: "Hero Image",
		},
		backgroundColor: "#FFFFFF",
		textColor: "#000000",
		messages: [
			{
				header: "Welcome to the Event!",
				body: "We are excited to have you join us.",
			},
			{
				header: "Important Information",
				body: "Please arrive at least 30 minutes before the event starts.",
			},
		],
		links: [
			{
				label: "Event Details",
				url: "https://example.com/event-details", // Replace with your event details URL
			},
			{
				label: "Contact Us",
				url: "https://example.com/contact", // Replace with your contact URL
			},
		],
		locations: [
			{
				latitude: 37.7749, // Replace with your event location latitude
				longitude: -122.4194, // Replace with your event location longitude
				address: {
					addressLines: ["123 Event St", "San Francisco, CA 94103"], // Replace with your event address
					country: "US", // Replace with your country code
					postalCode: "94103", // Replace with your postal code
					locality: "San Francisco", // Replace with your locality
					administrativeArea: "CA", // Replace with your administrative area
				},
			},
		],
		barcode: {
			type: "QR_CODE",
			value: "https://example.com/ticket/12345", // Replace with your ticket URL
		},
		linksModuleData: {
			uris: [
				{
					uri: "https://example.com/ticket/12345", // Replace with your ticket URL
					description: "View Ticket",
				},
				{
					uri: "https://example.com/event-details", // Replace with your event details URL
					description: "Event Details",
				},
				{
					uri: "https://example.com/contact", // Replace with your contact URL
					description: "Contact Us",
				},
			],
		},
	};

	let response;
	try {
		response = await client.request({
			url: `${baseUrl}/genericClass/${classId}`,
			method: "GET",
			data: passClass,
		})

		log("Pass class already exists:", response);
	}
	catch (error) {
		if (error.response & error.response.status === 404) {
		response = await client.request({
			url: `${baseUrl}/genericClass/${classId}`,
			method: "POST",
			data: passClass,
		});} else {
			log("Error creating pass class:", error);
		}
	}
}

export function createPassObject() {
	createPassClass();
}
