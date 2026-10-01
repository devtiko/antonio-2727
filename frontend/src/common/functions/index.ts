export function toBase64(data: Uint8Array): string {
	return btoa(String.fromCharCode(...data));
}

export function fromBase64(value: string): ArrayBuffer {
	return Uint8Array.from(atob(value), (char) => char.charCodeAt(0)).buffer;
}
