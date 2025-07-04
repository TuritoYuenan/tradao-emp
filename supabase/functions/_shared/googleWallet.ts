// Import the Google Auth library for authentication
import GoogleWallet from "npm:@googleapis/walletobjects"
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
