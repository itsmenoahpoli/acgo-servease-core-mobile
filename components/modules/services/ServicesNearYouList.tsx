import { ScrollView, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import { Service, getServiceImageUrl } from '@/types/service';
import { formatPriceAmount } from '@/utils/helpers.util';

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
		router.push(`/user/customer/service/${service.id}`);
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingRight: 16 }}
			className="flex-row gap-5"
		>
			{services.map((service) => {
				const imageUrl = getServiceImageUrl(service);
				return (
					<Pressable
						key={service.id}
						onPress={() => onSelect?.(service)}
						style={{ width: CARD_WIDTH, marginRight: 24 }}
						className="bg-white overflow-hidden"
					>
						<View className="h-40 bg-gray-100 items-center justify-center rounded-xl overflow-hidden">
							{imageUrl ? (
								<Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
							) : (
								<Ionicons name="image-outline" size={40} color="#9CA3AF" />
							)}
						</View>
						<View className="p-3">
							<Text className="text-sm font-bold text-gray-900 mb-1" numberOfLines={2}>
								{service.title}
							</Text>
							{service.category?.name ? (
								<Text className="text-xs text-gray-500 mb-0.5" numberOfLines={1}>
									{service.category.name}
								</Text>
							) : null}
							<Text className="text-xs text-gray-600" numberOfLines={2}>
								{service.description}
							</Text>
							<View className="flex-row items-center justify-between mt-2">
								<Text className="text-sm font-semibold text-primary">
									{formatPriceAmount(service.price) || service.price}
								</Text>
								{service.rating != null ? (
									<View className="flex-row items-center">
										<Ionicons name="star" size={12} color="#FBBF24" />
										<Text className="text-xs text-gray-600 ml-0.5">{service.rating}</Text>
									</View>
								) : null}
							</View>
						</View>
					</Pressable>
				);
			})}
		</ScrollView>
	);
}
