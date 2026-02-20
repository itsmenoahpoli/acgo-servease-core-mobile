import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

export const authTokenStorage = {
	async getAccessToken(): Promise<string | null> {
		try {
			return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
		} catch {
			return null;
		}
	},

	async getRefreshToken(): Promise<string | null> {
		try {
			return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
		} catch {
			return null;
		}
	},

	async setTokens(accessToken: string, refreshToken: string): Promise<void> {
		try {
			await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
			await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
		} catch (e) {
			console.error('[authTokenStorage] setTokens failed', e);
			throw e;
		}
	},

	async clearTokens(): Promise<void> {
		try {
			await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
			await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
		} catch (e) {
			console.error('[authTokenStorage] clearTokens failed', e);
		}
	},
};
