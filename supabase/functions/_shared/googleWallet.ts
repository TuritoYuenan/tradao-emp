// Import the Google Auth library for authentication
import GoogleWallet from "npm:@googleapis/walletobjects"

const issuerId = Deno.env.get("GOOGLE_ISSUER_ID") || "1234567890";
const classId = `${issuerId}.tradao_event`;

export const client = new GoogleWallet.auth.GoogleAuth({
	scopes: 'https://www.googleapis.com/auth/wallet_object.issuer',
	credentials: {
		client_email: Deno.env.get("GOOGLE_CLIENT_EMAIL") || "",
		private_key: Deno.env.get("GOOGLE_PRIVATE_KEY") || "",
	},
});

export const walletClient = GoogleWallet.walletobjects({
	auth: client,
	version: 'v1',
});
