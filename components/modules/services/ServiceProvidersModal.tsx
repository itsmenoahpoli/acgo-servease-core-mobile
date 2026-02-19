import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Modal, ActivityIndicator, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ServiceProviderRef } from '@/types/service';
import { getProviderTypeLabel } from '@/types/service';

const AVATAR_SIZE = 44;

function getProviderInitials(provider: ServiceProviderRef): string {
	if (provider.firstName && provider.lastName) {
		const first = provider.firstName.trim().charAt(0);
		const last = provider.lastName.trim().charAt(0);
		return (first + last).toUpperCase().slice(0, 2);
	}
	const name = (provider.name || '').trim();
	if (name.length >= 2) return name.slice(0, 2).toUpperCase();
	if (name.length === 1) return name.toUpperCase();
	return '?';
}

function getProviderBadgeStyle(accountType?: string): { bg: string; text: string } {
	const type = (accountType ?? '').toLowerCase();
	if (type.includes('business')) return { bg: 'bg-secondary/15', text: 'text-secondary' };
	if (type.includes('independent') || type.includes('freelancer')) return { bg: 'bg-blue-100', text: 'text-blue-700' };
	return { bg: 'bg-gray-200', text: 'text-gray-700' };
}

interface ServiceProvidersModalProps {
	visible: boolean;
	onClose: () => void;
	providers: ServiceProviderRef[];
	isLoading: boolean;
	onSelectProvider?: (provider: ServiceProviderRef) => void;
	onFilterPress?: () => void;
}

export function ServiceProvidersModal({
	visible,
	onClose,
	providers,
	isLoading,
	onSelectProvider,
	onFilterPress,
}: ServiceProvidersModalProps) {
	const insets = useSafeAreaInsets();
	const [searchValue, setSearchValue] = useState('');

	const filteredProviders = useMemo(() => {
		const q = searchValue.trim().toLowerCase();
		if (!q) return providers;
		return providers.filter(
			(p) =>
				p.name?.toLowerCase().includes(q) ||
				p.firstName?.toLowerCase().includes(q) ||
				p.lastName?.toLowerCase().includes(q)
		);
	}, [providers, searchValue]);

	return (
		<>
			{visible && <StatusBar style="dark" />}
			<Modal visible={visible} animationType="slide" statusBarTranslucent>
				<View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
					<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
						<View className="w-8" />
						<Text className="flex-1 text-lg font-semibold text-gray-900 text-center">
							Service Providers
						</Text>
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
								placeholder="Search providers"
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
					{isLoading && providers.length === 0 ? (
						<View className="flex-1 items-center justify-center">
							<ActivityIndicator size="large" color="#7a0f1d" />
						</View>
					) : (
						<ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
							{filteredProviders.map((provider) => {
								const typeLabel = getProviderTypeLabel(provider);
								const initials = getProviderInitials(provider);
								const badgeStyle = getProviderBadgeStyle(provider.accountType);
								return (
									<Pressable
										key={provider.id}
										onPress={() => {
											onSelectProvider?.(provider);
											onClose();
										}}
										className="py-4 border-b border-gray-100 flex-row items-center"
									>
										<View
											className={`rounded-full items-center justify-center ${badgeStyle.bg}`}
											style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
										>
											<Text className={`text-base font-bold ${badgeStyle.text}`}>{initials}</Text>
										</View>
										<View className="flex-1 ml-3">
											<Text className="text-base font-semibold text-gray-900">{provider.name}</Text>
											<View className={`self-start mt-1 px-2 py-0.5 rounded-full ${badgeStyle.bg}`}>
												<Text className={`text-[10px] font-semibold ${badgeStyle.text}`}>{typeLabel}</Text>
											</View>
										</View>
										<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
									</Pressable>
								);
							})}
						</ScrollView>
					)}
				</View>
			</Modal>
		</>
	);
}
