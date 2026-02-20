import { useQuery } from '@tanstack/react-query';
import { customerBookingsService } from '@/services/customer-bookings.service';

export const customerBookingsQueryKey = ['customerBookings'] as const;

export function useCustomerBookings() {
	return useQuery({
		queryKey: customerBookingsQueryKey,
		queryFn: () => customerBookingsService.fetchAll(),
	});
}
