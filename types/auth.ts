/** Authenticated user profile as returned from GET /api/v1/auth/profile */
export interface AuthProfile {
	id: string;
	email?: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	address?: string;
	[key: string]: unknown;
}
