import { httpClient } from './httpClient';
import type { ServiceProviderRef } from '@/types/service';

const CUSTOMER_SERVICE_PROVIDERS_PATH = '/customer/service-providers';

export const customerServiceProvidersService = {
	async fetchAll(params: { limit?: number } = {}): Promise<ServiceProviderRef[]> {
		const { data } = await httpClient.get<ServiceProviderRef[]>(CUSTOMER_SERVICE_PROVIDERS_PATH, {
			params: {
				limit: params.limit ?? 8,
			},
		});
		return data;
	},
};
