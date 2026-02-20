import { useMemo, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';
import { ServiceList } from '@/components/modules/services/ServiceList';
import { useCustomerServices } from '@/hooks/useCustomerServices';
import type { Service } from '@/types/service';

export default function ServicesByCategory() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const [searchValue, setSearchValue] = useState('');
	const params = useLocalSearchParams<{ categoryId?: string; categoryName?: string }>();
	const categoryId = Array.isArray(params.categoryId) ? params.categoryId[0] : params.categoryId;
	const categoryName = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName;

	const {
		data: services = [],
		isLoading,
		isError,
		refetch,
	} = useCustomerServices(categoryId ? { categoryId, limit: 50 } : {});

	const filteredServices = useMemo(() => {
		const q = searchValue.trim().toLowerCase();
		if (!q) return services;
		return services.filter(
			(s) =>
				s.title?.toLowerCase().includes(q) ||
				s.description?.toLowerCase().includes(q) ||
				s.category?.name?.toLowerCase().includes(q),
		);
	}, [services, searchValue]);

	const title = categoryName?.trim() || 'Services';

	const handleSelectService = (service: Service) => {
		router.push({
			pathname: '/user/customer/service/[id]',
			params: { id: service.id, service: JSON.stringify(service) },
		});
	};

	if (!categoryId) {
		return (
			<UserLayout showHeader={false} showFooter={false}>
				<View className="flex-1 items-center justify-center px-4">
					<Text className="text-lg font-semibold text-gray-900 mb-4">Category required</Text>
					<Pressable onPress={() => router.back()} className="px-6 py-3 bg-primary rounded-lg">
						<Text className="text-white font-semibold">Go back</Text>
					</Pressable>
				</View>
			</UserLayout>
		);
	}

	return (
		<UserLayout showHeader={false} showFooter={false}>
			<View className="flex-1 bg-gray-50">
				<View
					className="bg-white border-b border-gray-100 px-4 pt-4 flex-row items-center justify-between"
					style={{ paddingBottom: 12 }}
				>
					<Pressable onPress={() => router.back()} className="w-8 h-8 items-center justify-center -ml-1">
						<Ionicons name="arrow-back" size={24} color="#111827" />
					</Pressable>
					<Text className="flex-1 text-lg font-semibold text-gray-900 text-center" numberOfLines={1}>
						{title}
					</Text>
					<View className="w-8" />
				</View>

				<View className="flex-row items-center gap-2 px-4 py-3 bg-white border-b border-gray-100">
					<View className="flex-1 flex-row items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
						<Ionicons name="search-outline" size={18} color="#9CA3AF" />
						<TextInput
							value={searchValue}
							onChangeText={setSearchValue}
							placeholder="Search services"
							placeholderTextColor="#9CA3AF"
							className="flex-1 ml-2 text-base text-gray-900"
							returnKeyType="search"
						/>
					</View>
					<Pressable className="w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 items-center justify-center">
						<Ionicons name="options-outline" size={22} color="#374151" />
					</Pressable>
				</View>

				<ServiceList
					services={filteredServices}
					isLoading={isLoading}
					isError={isError}
					refetch={refetch}
					onSelectService={handleSelectService}
					variant="vertical"
					emptyTitle="No services in this category"
					emptyMessage="Try another category"
					className="px-4"
					contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 24 }}
				/>
			</View>
		</UserLayout>
	);
}
