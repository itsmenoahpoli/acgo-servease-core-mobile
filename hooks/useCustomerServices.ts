import { useQuery } from '@tanstack/react-query';
import { customerServicesService } from '@/services/customer-services.service';

export const customerServicesQueryKey = ['customerServices'] as const;

export function useCustomerServices(params: { page?: number; limit?: number; categoryId?: string } = {}) {
	return useQuery({
		queryKey: [...customerServicesQueryKey, params.categoryId ?? null],
		queryFn: () => customerServicesService.fetchAll(params),
	});
}
