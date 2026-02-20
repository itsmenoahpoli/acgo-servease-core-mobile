import { useQuery } from '@tanstack/react-query';
import { authProfileService } from '@/services/auth-profile.service';

export const authProfileQueryKey = ['authProfile'] as const;

export function useAuthProfile() {
	return useQuery({
		queryKey: authProfileQueryKey,
		queryFn: () => authProfileService.getProfile(),
		staleTime: 5 * 60 * 1000,
	});
}
