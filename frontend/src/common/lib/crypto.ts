import { toBase64, fromBase64 } from "../functions";

const SECRET_KEY = "my-secret-key";

export class Crypto {
	private static readonly encoder = new TextEncoder();
	private static readonly decoder = new TextDecoder();

	private static async getKey(): Promise<CryptoKey> {
		const keyMaterial = await crypto.subtle.importKey(
			"raw",
			this.encoder.encode(SECRET_KEY),
			"PBKDF2",
			false,
			["deriveKey"],
		);

		return crypto.subtle.deriveKey(
			{
				name: "PBKDF2",
				salt: this.encoder.encode("storage"),
				iterations: 100_000,
				hash: "SHA-256",
			},
			keyMaterial,
			{
				name: "AES-GCM",
				length: 256,
			},
			false,
			["encrypt", "decrypt"],
		);
	}

	static async encrypt(value: string): Promise<string> {
		const key = await this.getKey();

		const iv = crypto.getRandomValues(new Uint8Array(12));

		const encrypted = await crypto.subtle.encrypt(
			{
				name: "AES-GCM",
				iv,
			},
			key,
			this.encoder.encode(value),
		);

		const result = new Uint8Array(iv.length + encrypted.byteLength);

		result.set(iv, 0);
		result.set(new Uint8Array(encrypted), iv.length);

		return toBase64(result);
	}

	static async decrypt(value: string): Promise<string> {
		const encrypted = fromBase64(value);
		const iv = encrypted.slice(0, 12);
		const data = encrypted.slice(12);

		const key = await this.getKey();

		const decrypted = await crypto.subtle.decrypt(
			{
				name: "AES-GCM",
				iv,
			},
			key,
			data,
		);

		return this.decoder.decode(decrypted);
	}
}
