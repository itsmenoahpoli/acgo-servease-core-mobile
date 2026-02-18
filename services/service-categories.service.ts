import { httpClient } from './httpClient';
import type { ServiceCategory } from '@/types/service';

const CATEGORIES_PATH = '/customer/services/categories';

export const serviceCategoriesService = {
	async fetchAll(): Promise<ServiceCategory[]> {
		const { data } = await httpClient.get<ServiceCategory[]>(CATEGORIES_PATH);

		return data;
	},
};
