export function getCSRFToken(): string | null {
	return localStorage.getItem('CSRFToken');
}

export function setCSRFToken(token: string) {
	localStorage.setItem('CSRFToken', token);
}
