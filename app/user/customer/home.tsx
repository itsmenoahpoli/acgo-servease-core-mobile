import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserLayout } from '@/components/layouts/UserLayout';
import { HomeHeader } from '@/components/modules/home/HomeHeader';
import { ServiceCategoryChips } from '@/components/modules/services/ServiceCategoryChips';
import { ServiceHighlightCarousel } from '@/components/modules/services/ServiceHighlightCarousel';
import { ServiceListCards } from '@/components/modules/services/ServiceListCards';
import { serviceCategories, popularServices } from '@/data/services';
import { Service, ServiceCategory } from '@/types/service';

export default function Home() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const handleCategoryPress = (category: ServiceCategory) => {
		console.log('Category selected:', category.name);
	};

	const navigateToService = (service: Service) => {
		router.push({ pathname: '/user/customer/service/[id]', params: { id: service.id } });
	};

	return (
		<UserLayout title="SERVICES MARKETPLACE" showHeader={false} showFooter={true}>
			<View className="bg-secondary" style={{ paddingTop: insets.top }}>
				<HomeHeader locationLabel="Manila, Philippines" onProfilePress={() => router.push('/user/customer/profile')} />
			</View>

			<ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
				<View className="px-4 py-4">
					<View className="mb-6">
						<View className="flex-row items-center justify-between mb-3">
							<Text className="text-lg font-bold text-gray-900">Search by Categories</Text>
							<Pressable>
								<Text className="text-primary text-sm font-medium">Learn More</Text>
							</Pressable>
						</View>
						<ServiceCategoryChips categories={serviceCategories} onSelect={handleCategoryPress} />
					</View>

					<View className="mb-6">
						<View className="flex-row items-center justify-between mb-3">
							<Text className="text-lg font-bold text-gray-900">Most Popular Services</Text>
							<Pressable>
								<Text className="text-primary text-sm font-medium">Learn More</Text>
							</Pressable>
						</View>
						<ServiceHighlightCarousel
							services={popularServices}
							onSelect={navigateToService}
							onBook={navigateToService}
						/>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">All Services</Text>
						<ServiceListCards services={popularServices} onSelect={navigateToService} />
					</View>
				</View>
			</ScrollView>
		</UserLayout>
	);
}
