// Import the Google Auth library for authentication
import GoogleWallet from "@googleapis/walletobjects";

// Import JWT library for creating tokens
import { importPKCS8, type JWTPayload, SignJWT } from "jose";

// Import database models
import { type Tables } from "./models.ts";
import { serialiseDate } from "./utils.ts";

// Abstract types. Configurable later.
type PassClass = GoogleWallet.walletobjects_v1.Schema$GenericClass;
type PassObject = GoogleWallet.walletobjects_v1.Schema$GenericObject;

const issuerId = import.meta.env.VITE_GOOGLE_ISSUER_ID as string || "";
const clientEmail = import.meta.env.VITE_GOOGLE_CLIENT_EMAIL as string || "";
const privateKey = (import.meta.env.VITE_GOOGLE_PRIVATE_KEY as string || "").replace(/\\n/g, "\n");

export const classId = `${issuerId}.tradao_event`;

/**
 * Google client to authenticate with Google Wallet API.
 * Uses environment variables for credentials.
 */
const authClient = new GoogleWallet.auth.GoogleAuth({
	scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
	credentials: { client_email: clientEmail, private_key: privateKey },
});

/**
 * Google Wallet client to interact with the Wallet Objects API.
 * Uses the authenticated client and specifies the API version.
 */
export const walletClient = GoogleWallet.walletobjects({
	auth: authClient,
	version: "v1",
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
							dateFormat: "DATE_TIME_YEAR",
						},
					],
				},
			},
			endItem: {
				firstValue: {
					fields: [
						{
							fieldPath:
								"object.textModulesData['ticket_created_at']",
							dateFormat: "DATE_YEAR",
						},
					],
				},
			},
		},
	};

	const secondRow: GoogleWallet.walletobjects_v1.Schema$CardRowTemplateInfo =
		{
			twoItems: {
				startItem: {
					firstValue: {
						fields: [
							{
								fieldPath:
									"object.textModulesData['full_name']",
							},
						],
					},
				},
				endItem: {
					firstValue: {
						fields: [
							{
								fieldPath: "object.textModulesData['email']",
							},
						],
					},
				},
			},
		};

	const thirdRow: GoogleWallet.walletobjects_v1.Schema$CardRowTemplateInfo = {
		twoItems: {
			startItem: {
				firstValue: {
					fields: [
						{
							fieldPath:
								"object.textModulesData['academic_year']",
						},
					],
				},
			},
			endItem: {
				firstValue: {
					fields: [
						{
							fieldPath:
								"object.textModulesData['field_of_study']",
						},
					],
				},
			},
		},
	};

	const passClass: PassClass = {
		id: classId,
		classTemplateInfo: {
			cardTemplateOverride: {
				cardRowTemplateInfos: [firstRow, secondRow, thirdRow],
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
			],
		},
		securityAnimation: { animationType: "FOIL_SHIMMER" },
		multipleDevicesAndHoldersAllowedStatus: "ONE_USER_ALL_DEVICES",
	};

	let response;
	try {
		// Check if the pass class already exists
		response = await walletClient.genericclass.get({ resourceId: classId });

		console.log(`Pass class ${classId} already exists.`);
		console.log(response);
		return classId;
	} catch (error) {
		if (error.response?.status === 404) {
			response = await walletClient.genericclass.insert({
				requestBody: passClass,
			});

			console.log(`Pass class ${classId} created successfully.`);
			console.log(response);
			return classId;
		} else {
			// If the request failed for another reason, throw an error
			throw new Error(`Failed to get pass class: ${error.message}`);
		}
	}
}

/**
 * MARK: Create a pass object for a ticket.
 * @param properties - The properties of the ticket, including event details.
 * @returns Object ID if it exists or is created.
 * @throws Error if the pass object cannot be created or retrieved.
 */
export async function createPassObject(
	classID: string,
	properties: Tables<"tickets_with_event_details">,
) {
	const passObject: PassObject = {
		id: `${issuerId}.${properties.ticket_id}`,
		classId: classID,
		genericType: "GENERIC_ENTRY_TICKET",
		hexBackgroundColor: "#FFFFFF",
		notifications: {
			upcomingNotification: { enableNotification: true },
		},
		// logo: {
		// 	sourceUri: {
		// 		uri: "https://tradao-emp.pages.dev/icon-lab.svg",
		// 		description: "ITea Lab Logo",
		// 	}
		// },
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
			},
		},
		header: {
			defaultValue: {
				value: properties.event_title,
				language: "en-AU",
			},
		},
		textModulesData: [
			{
				id: "event_date",
				header: "Event Date",
				body: serialiseDate(properties.event_start_time!),
			},
			{
				id: "ticket_created_at",
				header: "Ticket Created At",
				body: serialiseDate(properties.created_at!),
			},
			{
				id: "full_name",
				header: "My Name",
				body: properties.name,
			},
			{
				id: "email",
				header: "My Email",
				body: properties.email,
			},
			{
				id: "academic_year",
				header: "My Current Year",
				body: properties.academic_year,
			},
			{
				id: "field_of_study",
				header: "My Field",
				body: properties.field_of_study,
			},
			{
				id: "major",
				header: "My Major",
				body: properties.major,
			},
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
					},
					{
						value: "Tradaoでチケットを見る",
						language: "ja-JP",
					},
				],
			},
			webAppLinkInfo: {
				appTarget: {
					targetUri: {
						description: "Lookup this ticket",
						uri: `https://tradao-emp.pages.dev/tickets/${properties.ticket_id}`,
					},
				},
			},
		},
		// merchantLocations: [
		// 	{ longitude: 106.669, latitude: 10.8162, },
		// 	{ longitude: 106.6711, latitude: 10.8143, }
		// ],
		validTimeInterval: {
			start: { date: serialiseDate(properties.event_start_time!) },
			end: { date: serialiseDate(properties.event_end_time!) },
		},
		// heroImage: {
		// 	sourceUri: {
		// 		uri: properties.event_image || "https://placehold.co/160x90",
		// 		description: "Event Hero Image",
		// 	}
		// },
	};

	let response;
	try {
		// Check if the pass object already exists
		response = await walletClient.genericobject.get({
			resourceId: passObject.id!,
		});

		console.log(`Pass object ${passObject.id} already exists.`);
		console.log(response);

		return passObject.id!;
	} catch (error) {
		if (error.response?.status === 404) {
			response = await walletClient.genericobject.insert({
				requestBody: passObject,
			});

			console.log(`Pass object ${passObject.id} created successfully.`);
			console.log(response);

			return passObject.id!;
		} else {
			// If the request failed for another reason, throw an error
			throw new Error(`Failed to get pass object: ${error.message}`);
		}
	}
}

/**
 * MARK: Generate a URL to save the pass to Google Wallet.
 * @param objectID Pass object ID
 * @returns The URL to save the pass to Google Wallet.
 */
export async function getPassSaveUrl(objectID: string) {
	const payload: JWTPayload = {
		origins: [],
		typ: "savetowallet",
		payload: {
			genericObjects: [{
				id: objectID,
				classId: classId,
			}],
		},
	};

	console.log(`Generating save URL for pass object ${objectID}...`);

	const key = await importPKCS8(privateKey, "RS256");
	const token: string = await new SignJWT(payload)
		.setProtectedHeader({ alg: "RS256" })
		.setIssuedAt()
		.setIssuer(clientEmail)
		.setAudience("google")
		.sign(key);

	// Generate the save URL for the pass object
	return `https://pay.google.com/gp/v/save/${token}`;
}
