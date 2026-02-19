import { useQuery } from '@tanstack/react-query';
import { customerServicesService } from '@/services/customer-services.service';

export const customerServicesQueryKey = ['customerServices'] as const;

export function useCustomerServices(params: { page?: number; limit?: number } = {}) {
	return useQuery({
		queryKey: customerServicesQueryKey,
		queryFn: () => customerServicesService.fetchAll(params),
	});
}
