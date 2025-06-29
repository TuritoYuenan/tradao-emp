// Import the Google Auth library for authentication
import GoogleWallet from "npm:@googleapis/walletobjects"

const issuerId = Deno.env.get("GOOGLE_ISSUER_ID") || "1234567890";
const classId = `${issuerId}.tradao_event`;

/**
 * Google client to authenticate with Google Wallet API.
 * Uses environment variables for credentials.
 */
export const client = new GoogleWallet.auth.GoogleAuth({
	scopes: 'https://www.googleapis.com/auth/wallet_object.issuer',
	credentials: {
		client_email: Deno.env.get("GOOGLE_CLIENT_EMAIL") || "",
		private_key: Deno.env.get("GOOGLE_PRIVATE_KEY") || "",
	},
});

/**
 * Google Wallet client to interact with the Wallet Objects API.
 * Uses the authenticated client and specifies the API version.
 */
export const walletClient = GoogleWallet.walletobjects({
	auth: client,
	version: 'v1',
});
