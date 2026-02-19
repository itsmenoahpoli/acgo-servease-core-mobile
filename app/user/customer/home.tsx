import { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserLayout } from '@/components/layouts/UserLayout';
import { HomeHeader } from '@/components/modules/home/HomeHeader';
import { CategoriesModal } from '@/components/modules/home/CategoriesModal';
import { ServiceCategoryChips } from '@/components/modules/services/ServiceCategoryChips';
import { ServicesNearYouList } from '@/components/modules/services/ServicesNearYouList';
import { useServiceCategories, serviceCategoriesQueryKey } from '@/hooks/useServiceCategories';
import { useCustomerServices, customerServicesQueryKey } from '@/hooks/useCustomerServices';
import { ServiceCategory, Service } from '@/types/service';

export default function Home() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const [viewAllCategoriesModalVisible, setViewAllCategoriesModalVisible] = useState(false);

	const { data: categories = [], isLoading: categoriesLoading } = useServiceCategories();
	const { data: servicesNearYou = [], isLoading: servicesNearYouLoading } = useCustomerServices({ limit: 10 });

	const isLoading = categoriesLoading;

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: serviceCategoriesQueryKey }),
			queryClient.invalidateQueries({ queryKey: customerServicesQueryKey }),
		]);

		setTimeout(() => {
			setRefreshing(false);
		}, 300);
	}, [queryClient]);

	const handleCategoryPress = (category: ServiceCategory) => {
		console.log('Category selected:', category.name);
	};

	const handleServicePress = (service: Service) => {
		router.push({ pathname: '/user/customer/service/[id]', params: { id: service.id } });
	};

	return (
		<UserLayout title="SERVICES MARKETPLACE" showHeader={false} showFooter={true} statusBarStyle="light">
			<View className="bg-secondary" style={{ paddingTop: insets.top }}>
				<HomeHeader locationLabel="Manila, Philippines" onProfilePress={() => router.push('/user/customer/profile')} />
			</View>

			<ScrollView
				className="flex-1 bg-white"
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						title="Pull down to refresh"
						titleColor="#999"
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#7a0f1d"
					/>
				}
			>
				<View className="flex flex-col gap-5 p-4">
					<View>
						<View className="flex-row items-center justify-between mb-5">
							<Text className="text-xl font-semibold text-gray-900">Search by Categories</Text>
							<Pressable onPress={() => setViewAllCategoriesModalVisible(true)}>
								<Text className="text-sm text-primary">View All</Text>
							</Pressable>
						</View>
						<ServiceCategoryChips
							categories={categories}
							isLoading={categoriesLoading}
							onSelect={handleCategoryPress}
						/>
					</View>

					<View className="flex flex-col gap-10">
						<View>
							<View className="flex-row items-center justify-between mb-5">
								<Text className="text-xl font-semibold text-gray-900">Offered Services Near You</Text>
								<Pressable onPress={() => {}}>
									<Text className="text-sm text-primary">View More</Text>
								</Pressable>
							</View>
							<ServicesNearYouList
								services={servicesNearYou}
								isLoading={servicesNearYouLoading}
								onSelect={handleServicePress}
							/>
						</View>

						<View>
							<View className="flex-row items-center justify-between mb-5">
								<Text className="text-xl font-semibold text-gray-900">Top Service Providers</Text>
								<Pressable onPress={() => {}}>
									<Text className="text-sm text-primary">View More</Text>
								</Pressable>
							</View>
							<ServicesNearYouList
								services={servicesNearYou}
								isLoading={servicesNearYouLoading}
								onSelect={handleServicePress}
							/>
						</View>
					</View>
				</View>
			</ScrollView>

			<CategoriesModal
				visible={viewAllCategoriesModalVisible}
				onClose={() => setViewAllCategoriesModalVisible(false)}
				categories={categories}
				isLoading={isLoading}
				onSelectCategory={handleCategoryPress}
			/>
		</UserLayout>
	);
}
