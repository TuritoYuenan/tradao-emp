// Import the Google Auth library for authentication
import GoogleWallet from "npm:@googleapis/walletobjects"

// Import JWT library for creating tokens
import { importPKCS8, SignJWT } from "npm:jose@5.9.6";

// Import database models
import { Tables } from "../_shared/models.ts";
import { serialiseDate } from "./utils.ts";

// Abstract types. Configurable later.
type PassClass = GoogleWallet.walletobjects_v1.Schema$GenericClass;
type PassObject = GoogleWallet.walletobjects_v1.Schema$GenericObject;

if (
	!Deno.env.has("GOOGLE_ISSUER_ID") ||
	!Deno.env.has("GOOGLE_CLIENT_EMAIL") ||
	!Deno.env.has("GOOGLE_PRIVATE_KEY")
) throw new Error("Missing required environment variables.");

const issuerId = Deno.env.get("GOOGLE_ISSUER_ID") || "1234567890";
const clientEmail = Deno.env.get("GOOGLE_CLIENT_EMAIL") || "";
const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY") || "";

export const classId = `${issuerId}.tradao_event`;

/**
 * Google client to authenticate with Google Wallet API.
 * Uses environment variables for credentials.
 */
const authClient = new GoogleWallet.auth.GoogleAuth({
	scopes: 'https://www.googleapis.com/auth/wallet_object.issuer',
	credentials: { client_email: clientEmail, private_key: privateKey },
});

/**
 * Google Wallet client to interact with the Wallet Objects API.
 * Uses the authenticated client and specifies the API version.
 */
export const walletClient = GoogleWallet.walletobjects({
	auth: authClient,
	version: 'v1',
});

/**
 * MARK: Create a pass class if it does not already exist.
 * @returns Class ID if it exists or is created.
 * @throws Error if the class cannot be created or retrieved.
 */
export async function createPassClass() {
	const firstRow: GoogleWallet.walletobjects_v1.Schema$CardRowTemplateInfo = {
		twoItems: {
			startItem: {
				firstValue: {
					fields: [
						{
							fieldPath: "object.textModulesData['event_date']",
						}
					]
				}
			},
			endItem: {
				firstValue: {
					fields: [
						{
							fieldPath: "object.textModulesData['full_name']",
						}
					]
				}
			}
		}
	};

	const secondRow: GoogleWallet.walletobjects_v1.Schema$CardRowTemplateInfo = {
		twoItems: {
			startItem: {
				firstValue: {
					fields: [
						{
							fieldPath: "object.textModulesData['email']",
						}
					]
				}
			},
			endItem: {
				firstValue: {
					fields: [
						{
							fieldPath: "object.textModulesData['academic_year']",
						}
					]
				}
			}
		}
	};

	const thirdRow: GoogleWallet.walletobjects_v1.Schema$CardRowTemplateInfo = {
		twoItems: {
			startItem: {
				firstValue: {
					fields: [
						{
							fieldPath: "object.textModulesData['field_of_study']",
						}
					]
				}
			},
			endItem: {
				firstValue: {
					fields: [
						{
							fieldPath: "object.textModulesData['major']",
						}
					]
				}
			}
		}
	};

	const passClass: PassClass = {
		id: classId,
		classTemplateInfo: {
			cardTemplateOverride: {
				cardRowTemplateInfos: [firstRow, secondRow, thirdRow]
			},
		},
		linksModuleData: {
			uris: [
				{
					uri: "https://itea-lab.github.io/portfolio-website",
					description: "ITea Lab Website",
				},
				{
					uri: "https://tradao-emp.pages.dev/events",
					description: "Browse more events at Tradao",
				},
			]
		},
		securityAnimation: { animationType: "FOIL_SHIMMER" },
		multipleDevicesAndHoldersAllowedStatus: "ONE_USER_ALL_DEVICES",
	};

	// Check if the pass class already exists
	const getResult = await walletClient.eventticketclass.get({ resourceId: classId });

	// If the class exists, return its ID
	if (getResult.ok) return classId;

	// If the class does not exist, create it
	if (getResult.status === 404) {
		const postResult = await walletClient.eventticketclass.insert({ requestBody: passClass });

		// If the insert was successful, return the class ID
		if (postResult.ok) return classId;

		// If the insert failed, throw an error
		throw new Error(`Failed to create pass class: ${postResult.statusText}`);
	}

	// If the request failed for another reason, throw an error
	throw new Error(`Failed to get pass class: ${getResult.statusText}`);
}

/**
 * MARK: Create a pass object for a ticket.
 * @param properties - The properties of the ticket, including event details.
 * @returns Object ID if it exists or is created.
 * @throws Error if the pass object cannot be created or retrieved.
 */
export async function createPassObject(
	classID: string,
	properties: Tables<"tickets_with_event_details">
) {
	const passObject: PassObject = {
		id: `${classID}.${properties.ticket_id}`,
		classId: classID,
		genericType: "GENERIC_ENTRY_TICKET",
		hexBackgroundColor: "#FFFFFF",
		notifications: {
			upcomingNotification: { enableNotification: true, }
		},
		logo: {
			sourceUri: {
				uri: "https://tradao-emp.pages.dev/icon-lab.svg",
				description: "ITea Lab Logo",
			}
		},
		cardTitle: {
			defaultValue: {
				value: "ITea Lab",
				language: "en-AU",
			},
		},
		subheader: {
			defaultValue: {
				value: properties.event_category,
				language: "en-AU",
			}
		},
		header: {
			defaultValue: {
				value: properties.event_title,
				language: "en-AU",
			}
		},
		textModulesData: [
			{
				id: "event_date",
				header: "Event Date",
				body: serialiseDate(properties.event_start_time!),
			},
			{
				id: "full_name",
				header: "Full Name",
				body: properties.name,
			},
			{
				id: "email",
				header: "Email",
				body: properties.email,
			},
			{
				id: "academic_year",
				header: "Academic Year",
				body: properties.academic_year,
			},
			{
				id: "field_of_study",
				header: "Field of Study",
				body: properties.field_of_study,
			},
			{
				id: "major",
				header: "Major",
				body: properties.major,
			}
		],
		barcode: {
			type: "QR_CODE",
			value: properties.ticket_id,
			alternateText: properties.ticket_id,
		},
		appLinkData: {
			displayText: {
				defaultValue: {
					value: "View Ticket on Tradao",
					language: "en-AU",
				},
				translatedValues: [
					{
						value: "Xem vé trên Tradao",
						language: "vi-VN",
					}
				]
			},
			webAppLinkInfo: {
				appTarget: {
					targetUri: {
						description: "Lookup this ticket",
						uri: `https://tradao-emp.pages.dev/tickets/${properties.ticket_id}`,
					},
				},
			}
		},
		merchantLocations: [
			{ longitude: 106.669, latitude: 10.8162, },
			{ longitude: 106.6711, latitude: 10.8143, }
		],
		validTimeInterval: {
			start: { date: serialiseDate(properties.event_start_time!) },
			end: { date: serialiseDate(properties.event_end_time!) },
		},
		heroImage: {
			sourceUri: {
				uri: properties.event_image || "placehold.co/160x90",
				description: "Event Hero Image",
			}
		},
	};

	// Check if the pass object already exists
	const getResult = await walletClient.eventticketobject.get({ resourceId: passObject.id! });

	// If the pass object exists, return its ID
	if (getResult.ok) return passObject.id!;

	// If the pass object does not exist, create it
	if (getResult.status === 404) {
		const postResult = await walletClient.eventticketobject.insert({ requestBody: passObject });

		// If the insert was successful, return the pass object ID
		if (postResult.ok) return passObject.id!;

		// If the insert failed, return an error message
		throw new Error(`Failed to create pass object: ${postResult.statusText}`);
	}

	// If the request failed for another reason, return an error message
	throw new Error(`Failed to get pass object: ${getResult.statusText}`);
}

/**
 * MARK: Generate a URL to save the pass to Google Wallet.
 * @param objectID Pass object ID
 * @returns The URL to save the pass to Google Wallet.
 */
export async function getPassSaveUrl(objectID: string) {
	const genericObjects: GoogleWallet.walletobjects_v1.Schema$GenericObject[] = [{
		id: objectID,
		classId: classId,
	}]

	const key = await importPKCS8(privateKey, "RS256");
	const token: string = await new SignJWT({
		origins: [],
		typ: 'savetowallet',
		payload: { genericObjects }
	})
		.setProtectedHeader({ alg: "RS256" })
		.setIssuedAt()
		.setIssuer(clientEmail)
		.setAudience("google")
		.sign(key);

	// Generate the save URL for the pass object
	return `https://pay.google.com/gp/v/save/${token}`;
}
