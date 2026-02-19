import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Modal, ActivityIndicator, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { Service } from '@/types/service';
import { ServiceCard } from './ServiceListCards';

interface ServicesModalProps {
	visible: boolean;
	onClose: () => void;
	services: Service[];
	isLoading: boolean;
	onSelectService?: (service: Service) => void;
	onFilterPress?: () => void;
}

export function ServicesModal({
	visible,
	onClose,
	services,
	isLoading,
	onSelectService,
	onFilterPress,
}: ServicesModalProps) {
	const insets = useSafeAreaInsets();
	const [searchValue, setSearchValue] = useState('');

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

	return (
		<>
			{visible && <StatusBar style="dark" />}
			<Modal visible={visible} animationType="slide" statusBarTranslucent>
				<View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
					<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
						<View className="w-8" />
						<Text className="flex-1 text-lg font-semibold text-gray-900 text-center">Offered Services</Text>
						<Pressable onPress={onClose} className="w-8 h-8 items-center justify-center">
							<Ionicons name="close" size={24} color="#374151" />
						</Pressable>
					</View>
					<View className="flex-row items-center gap-2 px-4 py-3 border-b border-gray-100">
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
						<Pressable
							onPress={onFilterPress}
							className="w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 items-center justify-center"
						>
							<Ionicons name="options-outline" size={22} color="#374151" />
						</Pressable>
					</View>
					{isLoading && services.length === 0 ? (
						<View className="flex-1 items-center justify-center">
							<ActivityIndicator size="large" color="#7a0f1d" />
						</View>
					) : (
						<ScrollView
							className="flex-1"
							contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
							showsVerticalScrollIndicator={false}
						>
							{filteredServices.map((service) => (
								<ServiceCard
									key={service.id}
									service={service}
									onSelect={(s) => {
										onSelectService?.(s);
										onClose();
									}}
								/>
							))}
						</ScrollView>
					)}
				</View>
			</Modal>
		</>
	);
}
