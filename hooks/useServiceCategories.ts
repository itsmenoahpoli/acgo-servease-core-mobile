import { useQuery } from '@tanstack/react-query';
import { serviceCategoriesService } from '@/services/service-categories.service';

export const serviceCategoriesQueryKey = ['serviceCategories'] as const;

export function useServiceCategories() {
	return useQuery({
		queryKey: serviceCategoriesQueryKey,
		queryFn: () => serviceCategoriesService.fetchAll(),
	});
}
