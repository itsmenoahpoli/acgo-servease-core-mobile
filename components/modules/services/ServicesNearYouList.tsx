import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import { Service } from '@/types/service';
import { ServiceCard } from './ServiceCard';

const CARD_WIDTH = 250;
const IMAGE_HEIGHT = 160;
const SHIMMER_PLACEHOLDERS = 5;

interface ServicesNearYouListProps {
	services: Service[];
	isLoading?: boolean;
}

function ShimmerPlaceholders() {
	return (
		<ShimmerProvider duration={1200}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 16 }}
				className="flex-row gap-5"
			>
				{Array.from({ length: SHIMMER_PLACEHOLDERS }).map((_, i) => (
					<View key={i} style={{ width: CARD_WIDTH, marginRight: 24 }}>
						<Shimmer
							style={{
								width: CARD_WIDTH,
								height: IMAGE_HEIGHT,
								borderRadius: 12,
								backgroundColor: '#eee',
							}}
						/>
						<View className="mt-3 px-1">
							<Shimmer
								style={{
									width: 120,
									height: 18,
									borderRadius: 4,
									backgroundColor: '#eee',
									marginBottom: 8,
								}}
							/>
							<Shimmer
								style={{
									width: 144,
									height: 14,
									borderRadius: 4,
									backgroundColor: '#eee',
								}}
							/>
						</View>
					</View>
				))}
			</ScrollView>
		</ShimmerProvider>
	);
}

export function ServicesNearYouList({ services, isLoading = false }: ServicesNearYouListProps) {
	const router = useRouter();

	if (isLoading) {
		return <ShimmerPlaceholders />;
	}

	const onSelect = (service: Service) => {
		router.push({
			pathname: '/user/customer/service/[id]',
			params: {
				id: service.id,
				service: JSON.stringify(service),
			},
		});
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingRight: 16 }}
			className="flex-row gap-5"
		>
			{services.map((service) => (
				<View key={service.id} style={{ width: CARD_WIDTH, marginRight: 24 }}>
					<ServiceCard service={service} onSelect={onSelect} variant="horizontal" />
				</View>
			))}
		</ScrollView>
	);
}
