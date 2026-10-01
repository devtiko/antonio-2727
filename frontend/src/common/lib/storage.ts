export class Storage {
	static get<T>(key: string): T | null {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	}

	static set<T>(key: string, value: T): void {
		return localStorage.setItem(key, JSON.stringify(value));
	}

	static remove(key: string): void {
		return localStorage.removeItem(key);
	}

	static clear(): void {
		return localStorage.clear();
	}
}
