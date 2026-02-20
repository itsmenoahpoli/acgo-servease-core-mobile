import { httpClient } from './httpClient';

const AUTH_SIGNIN_PATH = '/auth/signin';
const AUTH_VERIFY_2FA_PATH = '/auth/signin/verify-2fa';

export interface SignInPayload {
	email: string;
	password: string;
}

export interface SignInResponse {
	message?: string;
	requiresTwoFactor?: boolean;
	[key: string]: unknown;
}

export interface Verify2FAPayload {
	email: string;
	code: string;
}

export interface Verify2FAResponse {
	accessToken?: string;
	refreshToken?: string;
	message?: string;
	[key: string]: unknown;
}

export const authSigninService = {
	async signin(payload: SignInPayload): Promise<SignInResponse> {
		const { data } = await httpClient.post<SignInResponse>(AUTH_SIGNIN_PATH, payload);
		return data;
	},

	async verify2FA(payload: Verify2FAPayload): Promise<Verify2FAResponse> {
		const { data } = await httpClient.post<Verify2FAResponse>(AUTH_VERIFY_2FA_PATH, payload);
		return data;
	},
};
