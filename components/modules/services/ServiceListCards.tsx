import { View, Text, Pressable, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Service, getServiceImageUrl, getServiceProviderType } from '@/types/service';
import { formatPriceAmount } from '@/utils/helpers.util';

interface ServiceCardProps {
	service: Service;
	onSelect: (service: Service) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
	const imageUrl = getServiceImageUrl(service);
	const providerType = getServiceProviderType(service);
	const isCompany = providerType === 'Company Provider';

	return (
		<Pressable
			key={service.id}
			onPress={() => onSelect(service)}
			className="bg-white rounded-xl border border-gray-200 mb-3 overflow-hidden"
		>
			<View className="flex-row">
				<View className="w-32 h-32 bg-gray-200 items-center justify-center overflow-hidden">
					{imageUrl ? (
						<Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
					) : (
						<Ionicons name="image-outline" size={32} color="#9CA3AF" />
					)}
				</View>
				<View className="flex-1 p-3">
					<Text className="text-base font-bold text-gray-900 mb-1">{service.title}</Text>
					<View
						className={`self-start px-3 py-1 rounded-full mb-2 ${
							isCompany ? 'bg-secondary/10' : 'bg-blue-50'
						}`}
					>
						<Text
							className={`text-[10px] font-semibold ${
								isCompany ? 'text-secondary' : 'text-blue-700'
							}`}
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

