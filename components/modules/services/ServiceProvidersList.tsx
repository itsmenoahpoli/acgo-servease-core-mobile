import { ScrollView, View, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import type { ServiceProviderRef } from '@/types/service';
import { getProviderTypeLabel } from '@/types/service';

const CARD_WIDTH = 140;
const AVATAR_SIZE = 72;
const SHIMMER_PLACEHOLDERS = 4;

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

interface ServiceProvidersListProps {
	providers: ServiceProviderRef[];
	isLoading?: boolean;
	onSelectProvider?: (provider: ServiceProviderRef) => void;
}

function ShimmerPlaceholders() {
	return (
		<ShimmerProvider duration={1200}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 16 }}
				className="flex-row gap-4"
			>
				{Array.from({ length: SHIMMER_PLACEHOLDERS }).map((_, i) => (
					<View key={i} style={{ width: CARD_WIDTH, marginRight: 16 }}>
						<Shimmer
							style={{
								width: AVATAR_SIZE,
								height: AVATAR_SIZE,
								borderRadius: AVATAR_SIZE / 2,
								backgroundColor: '#eee',
								alignSelf: 'center',
								marginBottom: 8,
							}}
						/>
						<Shimmer
							style={{
								width: 80,
								height: 14,
								borderRadius: 4,
								backgroundColor: '#eee',
								alignSelf: 'center',
								marginBottom: 6,
							}}
						/>
						<Shimmer
							style={{
								width: 60,
								height: 12,
								borderRadius: 4,
								backgroundColor: '#eee',
								alignSelf: 'center',
							}}
						/>
					</View>
				))}
			</ScrollView>
		</ShimmerProvider>
	);
}

export function ServiceProvidersList({
	providers,
	isLoading = false,
	onSelectProvider,
}: ServiceProvidersListProps) {
	if (isLoading) {
		return <ShimmerPlaceholders />;
	}

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingRight: 16 }}
			className="flex-row gap-4"
		>
			{providers.map((provider) => {
				const typeLabel = getProviderTypeLabel(provider);
				const initials = getProviderInitials(provider);
				const badgeStyle = getProviderBadgeStyle(provider.accountType);
				return (
					<Pressable
						key={provider.id}
						onPress={() => onSelectProvider?.(provider)}
						style={{ width: CARD_WIDTH, marginRight: 16 }}
						className="bg-white rounded-xl border border-gray-200 overflow-hidden items-center py-4"
					>
						<View
							className={`rounded-full items-center justify-center mb-2 ${badgeStyle.bg}`}
							style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
						>
							<Text className={`text-xl font-bold ${badgeStyle.text}`}>{initials}</Text>
						</View>
						{provider.rating != null && (
							<View className="flex-row items-center justify-center mb-1">
								<Ionicons name="star" size={12} color="#FBBF24" />
								<Text className="text-xs text-gray-600 ml-0.5">
									{Number(provider.rating).toFixed(1)}
								</Text>
							</View>
						)}
						<Text className="text-sm font-semibold text-gray-900 text-center px-1" numberOfLines={2}>
							{provider.name}
						</Text>
						<View className={`mt-1 px-2 py-0.5 rounded-full ${badgeStyle.bg}`}>
							<Text className={`text-[10px] font-semibold ${badgeStyle.text}`}>{typeLabel}</Text>
						</View>
					</Pressable>
				);
			})}
		</ScrollView>
	);
}
