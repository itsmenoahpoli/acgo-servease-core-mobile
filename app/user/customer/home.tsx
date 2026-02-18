import { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Pressable, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';
import { HomeHeader } from '@/components/modules/home/HomeHeader';
import { ServiceCategoryChips } from '@/components/modules/services/ServiceCategoryChips';
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
				<View className="p-4">
					<View className="mb-6">
						<View className="flex-row items-center justify-between mb-5">
							<Text className="text-lg font-semibold text-gray-900">Search by Categories</Text>
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

					{/* <View className="mb-6">
						<View className="flex-row items-center justify-between mb-3">
							<Text className="text-lg font-bold text-gray-900">Most Popular Services</Text>
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
					</View> */}
				</View>
			</ScrollView>

			<Modal visible={viewAllCategoriesModalVisible} animationType="slide" statusBarTranslucent>
				<View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
					<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
						<View className="w-8" />
						<Text className="flex-1 text-lg font-semibold text-gray-900 text-center">Categories</Text>
						<Pressable
							onPress={() => setViewAllCategoriesModalVisible(false)}
							className="w-8 h-8 items-center justify-center"
						>
							<Ionicons name="close" size={24} color="#374151" />
						</Pressable>
					</View>
					{isLoading && categories.length === 0 ? (
						<View className="flex-1 items-center justify-center">
							<ActivityIndicator size="large" color="#7a0f1d" />
						</View>
					) : (
						<ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
							{categories.map((category: ServiceCategory) => (
								<Pressable
									key={category.id}
									onPress={() => {
										handleCategoryPress(category);
										setViewAllCategoriesModalVisible(false);
									}}
									className="py-4 border-b border-gray-100 flex-row items-center"
								>
									<Text className="text-base text-gray-900 flex-1">{category.name}</Text>
									<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
								</Pressable>
							))}
						</ScrollView>
					)}
				</View>
			</Modal>
		</UserLayout>
	);
}
