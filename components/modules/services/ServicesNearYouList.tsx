import { useRouter } from 'expo-router';
import type { Service } from '@/types/service';
import { ServiceList } from './ServiceList';

interface ServicesNearYouListProps {
	services: Service[];
	isLoading?: boolean;
}

export function ServicesNearYouList({ services, isLoading = false }: ServicesNearYouListProps) {
	const router = useRouter();

	const onSelectService = (service: Service) => {
		router.push({
			pathname: '/user/customer/service/[id]',
			params: {
				id: service.id,
				service: JSON.stringify(service),
			},
		});
	};

	return (
		<ServiceList
			services={services}
			isLoading={isLoading}
			onSelectService={onSelectService}
			variant="horizontal"
		/>
	);
}
