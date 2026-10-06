// import { Crypto } from "./crypto";

export class Storage {
	static get<T>(key: string): T | null {
		const value = localStorage.getItem(key);
		if (!value) return null;
		//Se desactiva para poder visualizar el storage
		// const decrypted = await Crypto.decrypt(value);
		return JSON.parse(value);
	}

	static set<T>(key: string, value: T): void {
		const serialized = JSON.stringify(value);
		//Se desactiva para poder visualizar el storage
		// const encrypted = await Crypto.encrypt(serialized);
		return localStorage.setItem(key, serialized);
	}

	static remove(key: string): void {
		return localStorage.removeItem(key);
	}

	static clear(): void {
		return localStorage.clear();
	}
}
