import { httpClient } from './httpClient';
import type { Service } from '@/types/service';

const CUSTOMER_SERVICES_PATH = '/customer/services';

export const customerServicesService = {
	async fetchAll(params: { page?: number; limit?: number } = {}): Promise<Service[]> {
		const { data } = await httpClient.get<Service[]>(CUSTOMER_SERVICES_PATH, {
			params: {
				limit: params.limit,
				isActive: true,
			},
		});
		return data;
	},

	async fetchById(id: string): Promise<Service> {
		const { data } = await httpClient.get<Service>(`${CUSTOMER_SERVICES_PATH}/${id}`);
		return data;
	},
};
