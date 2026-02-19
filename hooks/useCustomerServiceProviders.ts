import { useQuery } from '@tanstack/react-query';
import { customerServiceProvidersService } from '@/services/customer-service-providers.service';

export const customerServiceProvidersQueryKey = ['customerServiceProviders'] as const;

const HOME_PROVIDERS_LIMIT = 8;

export function useCustomerServiceProviders() {
	return useQuery({
		queryKey: [...customerServiceProvidersQueryKey, { limit: HOME_PROVIDERS_LIMIT }],
		queryFn: () => customerServiceProvidersService.fetchAll({ limit: HOME_PROVIDERS_LIMIT }),
	});
}
