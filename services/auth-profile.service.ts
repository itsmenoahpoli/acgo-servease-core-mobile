import { httpClient } from './httpClient';
import type { AuthProfile } from '@/types/auth';

const AUTH_PROFILE_PATH = '/auth/profile';

export const authProfileService = {
	async getProfile(): Promise<AuthProfile> {
		const { data } = await httpClient.get<AuthProfile>(AUTH_PROFILE_PATH);
		return data;
	},
};
