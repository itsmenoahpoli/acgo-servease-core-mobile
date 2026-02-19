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
import { ServiceCategory } from '@/types/service';

export default function Home() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const [viewAllCategoriesModalVisible, setViewAllCategoriesModalVisible] = useState(false);

	const { data: categories = [], isLoading: categoriesLoading } = useServiceCategories();

	const isLoading = categoriesLoading;

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await Promise.all([queryClient.invalidateQueries({ queryKey: serviceCategoriesQueryKey })]);

		setTimeout(() => {
			setRefreshing(false);
		}, 300);
	}, [queryClient]);

	const handleCategoryPress = (category: ServiceCategory) => {
		console.log('Category selected:', category.name);
	};

	return (
		<UserLayout title="SERVICES MARKETPLACE" showHeader={false} showFooter={true}>
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
				<View className="flex flex-col gap-8 p-4">
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

					<View>
						<View className="flex-row items-center justify-between mb-5">
							<Text className="text-xl font-semibold text-gray-900">Offered Services Near You</Text>
							<Pressable onPress={() => {}}>
								<Text className="text-sm text-primary">View More</Text>
							</Pressable>
						</View>
						<ServicesNearYouList />
					</View>

					<View>
						<View className="flex-row items-center justify-between mb-5">
							<Text className="text-xl font-semibold text-gray-900">Top Service Providers</Text>
							<Pressable onPress={() => {}}>
								<Text className="text-sm text-primary">View More</Text>
							</Pressable>
						</View>
						<ServicesNearYouList />
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
