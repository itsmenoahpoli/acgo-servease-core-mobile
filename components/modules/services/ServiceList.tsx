import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import type { Service } from '@/types/service';
import { ServiceCard, type ServiceCardVariant } from './ServiceCard';

const HORIZONTAL_CARD_WIDTH = 250;
const HORIZONTAL_IMAGE_HEIGHT = 160;
const HORIZONTAL_SHIMMER_COUNT = 5;

export interface ServiceListProps {
	services: Service[];
	isLoading?: boolean;
	isError?: boolean;
	refetch?: () => void;
	onSelectService: (service: Service) => void;
	variant: ServiceCardVariant;
	emptyTitle?: string;
	emptyMessage?: string;
	className?: string;
	contentContainerStyle?: object;
}

function HorizontalShimmer() {
	return (
		<ShimmerProvider duration={1200}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 16 }}
				className="flex-row gap-5"
			>
				{Array.from({ length: HORIZONTAL_SHIMMER_COUNT }).map((_, i) => (
					<View key={i} style={{ width: HORIZONTAL_CARD_WIDTH, marginRight: 24 }}>
						<Shimmer
							style={{
								width: HORIZONTAL_CARD_WIDTH,
								height: HORIZONTAL_IMAGE_HEIGHT,
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

export function ServiceList({
	services,
	isLoading = false,
	isError = false,
	refetch,
	onSelectService,
	variant,
	emptyTitle = 'No services',
	emptyMessage,
	className,
	contentContainerStyle,
}: ServiceListProps) {
	if (variant === 'horizontal') {
		if (isLoading) {
			return <HorizontalShimmer />;
		}
		return (
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 16, ...contentContainerStyle }}
				className={`flex-row gap-5 ${className ?? ''}`}
			>
				{services.map((service) => (
					<View key={service.id} style={{ width: HORIZONTAL_CARD_WIDTH, marginRight: 24 }}>
						<ServiceCard service={service} onSelect={onSelectService} variant="horizontal" />
					</View>
				))}
			</ScrollView>
		);
	}

	// vertical
	return (
		<ScrollView
			className={`flex-1 ${className ?? ''}`}
			contentContainerStyle={contentContainerStyle}
			showsVerticalScrollIndicator={false}
		>
			{isLoading && services.length === 0 ? (
				<View className="py-16 items-center">
					<ActivityIndicator size="large" color="#7a0f1d" />
					<Text className="text-gray-500 mt-3">Loading services...</Text>
				</View>
			) : isError ? (
				<View className="py-16 items-center">
					<Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
					<Text className="text-gray-600 text-center mt-3">Unable to load services</Text>
					{refetch ? (
						<Pressable onPress={refetch} className="mt-4 px-6 py-3 bg-primary rounded-xl">
							<Text className="text-white font-semibold">Retry</Text>
						</Pressable>
					) : null}
				</View>
			) : services.length === 0 ? (
				<View className="py-16 items-center">
					<Ionicons name="briefcase-outline" size={64} color="#D1D5DB" />
					<Text className="text-lg font-medium text-gray-500 mt-4">{emptyTitle}</Text>
					{emptyMessage ? (
						<Text className="text-sm text-gray-400 text-center mt-1">{emptyMessage}</Text>
					) : null}
				</View>
			) : (
				<View className="gap-4">
					{services.map((service) => (
						<ServiceCard
							key={service.id}
							service={service}
							onSelect={onSelectService}
							variant="vertical"
						/>
					))}
				</View>
			)}
		</ScrollView>
	);
}
