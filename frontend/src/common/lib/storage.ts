import { Crypto } from "./crypto";

export class Storage {
	static async get<T>(key: string): Promise<T | null> {
		const value = localStorage.getItem(key);
		if (!value) return null;
		const decrypted = await Crypto.decrypt(value);
		return JSON.parse(decrypted);
	}

	static async set<T>(key: string, value: T): Promise<void> {
		const serialized = JSON.stringify(value);
		const encrypted = await Crypto.encrypt(serialized);
		return localStorage.setItem(key, JSON.stringify(encrypted));
	}

	static remove(key: string): void {
		return localStorage.removeItem(key);
	}

	static clear(): void {
		return localStorage.clear();
	}
}
