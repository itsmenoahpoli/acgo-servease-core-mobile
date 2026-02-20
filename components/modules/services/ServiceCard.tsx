import { View, Text, Pressable, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
	Service,
	getServiceImageUrl,
	getServiceProviderType,
} from '@/types/service';
import { formatPriceAmount } from '@/utils/helpers.util';

const CATEGORY_BADGE_COLORS: { bg: string; text: string }[] = [
	{ bg: '#dbeafe', text: '#1e40af' },
	{ bg: '#d1fae5', text: '#047857' },
	{ bg: '#fef3c7', text: '#b45309' },
	{ bg: '#ffe4e6', text: '#be123c' },
	{ bg: '#ede9fe', text: '#5b21b6' },
	{ bg: '#e0f2fe', text: '#0369a1' },
	{ bg: '#dcfce7', text: '#15803d' },
	{ bg: '#ffedd5', text: '#c2410c' },
];

function getCategoryBadgeColors(categoryName: string): { bg: string; text: string } {
	let hash = 0;
	const s = categoryName.trim().toLowerCase();
	for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
	return CATEGORY_BADGE_COLORS[hash % CATEGORY_BADGE_COLORS.length];
}

function CategoryBadge({ name }: { name: string }) {
	const { bg, text } = getCategoryBadgeColors(name);
	return (
		<View
			className="self-start px-2.5 py-0.5 rounded-full mb-1"
			style={{ backgroundColor: bg }}
		>
			<Text className="text-[10px] font-semibold" style={{ color: text }} numberOfLines={1}>
				{name}
			</Text>
		</View>
	);
}

export type ServiceCardVariant = 'vertical' | 'horizontal';

interface ServiceCardProps {
	service: Service;
	onSelect: (service: Service) => void;
	variant?: ServiceCardVariant;
}

export function ServiceCard({
	service,
	onSelect,
	variant = 'vertical',
}: ServiceCardProps) {
	const imageUrl = getServiceImageUrl(service);

	if (variant === 'horizontal') {
		return (
			<Pressable
				onPress={() => onSelect(service)}
				className="bg-white overflow-hidden"
			>
				<View className="h-40 bg-gray-100 items-center justify-center rounded-xl overflow-hidden">
					{imageUrl ? (
						<Image
							source={{ uri: imageUrl }}
							className="w-full h-full"
							resizeMode="cover"
						/>
					) : (
						<Ionicons name="image-outline" size={40} color="#9CA3AF" />
					)}
				</View>
				<View className="p-3">
					<Text className="text-sm font-bold text-gray-900 mb-1" numberOfLines={2}>
						{service.title}
					</Text>
					{service.category?.name ? (
						<CategoryBadge name={service.category.name} />
					) : null}
					<Text className="text-xs text-gray-600" numberOfLines={2}>
						{service.description}
					</Text>
					<View className="flex-row items-center justify-between mt-1">
						<Text className="text-lg font-semibold text-primary">
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
	}

	// vertical (default): image left, content right
	const providerType = getServiceProviderType(service);
	const isCompany = providerType === 'Business';

	return (
		<Pressable
			onPress={() => onSelect(service)}
			className="bg-white rounded-xl mb-6 overflow-hidden"
		>
			<View className="flex-row">
				<View
					className="w-36 self-stretch bg-gray-200 overflow-hidden min-h-[80]"
					style={{ alignSelf: 'stretch' }}
				>
					{imageUrl ? (
						<Image
							source={{ uri: imageUrl }}
							className="w-full h-full"
							style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
							resizeMode="cover"
						/>
					) : (
						<View className="flex-1 items-center justify-center min-h-[80]">
							<Ionicons name="image-outline" size={32} color="#9CA3AF" />
						</View>
					)}
				</View>
				<View className="flex-1 p-3">
					<Text className="text-base font-bold text-gray-900 mb-1">{service.title}</Text>
					<View
						className={`self-start px-3 py-1 rounded-full mb-2 ${isCompany ? 'bg-primary/10' : 'bg-blue-50'}`}
					>
						<Text
							className={`text-[10px] font-semibold ${isCompany ? 'text-secondary' : 'text-blue-700'}`}
						>
							{providerType}
						</Text>
					</View>
					<Text className="text-xs text-gray-600 mb-2" numberOfLines={2}>
						{service.description}
					</Text>
					<View className="flex-row items-center mb-2">
						<Ionicons name="person-outline" size={14} color="#6B7280" />
						<Text className="text-xs text-gray-600 ml-1" numberOfLines={1}>
							{service.provider?.name ?? '—'}
						</Text>
					</View>
					<View className="flex-row items-center justify-between">
						{service.rating != null ? (
							<View className="flex-row items-center">
								<Ionicons name="star" size={14} color="#FBBF24" />
								<Text className="text-xs text-gray-600 ml-1">{service.rating}</Text>
							</View>
						) : null}
						<Text className="text-sm font-semibold text-primary">
							{formatPriceAmount(service.price) || service.price}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}
