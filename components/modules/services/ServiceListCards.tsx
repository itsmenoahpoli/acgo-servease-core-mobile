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
	const isCompany = providerType === 'Business';

	return (
		<Pressable key={service.id} onPress={() => onSelect(service)} className="bg-white rounded-xl mb-6 overflow-hidden">
			<View className="flex-row">
				<View className="w-36 self-stretch bg-gray-200 overflow-hidden min-h-[80]" style={{ alignSelf: 'stretch' }}>
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
					<View className={`self-start px-3 py-1 rounded-full mb-2 ${isCompany ? 'bg-primary/10' : 'bg-blue-50'}`}>
						<Text className={`text-[10px] font-semibold ${isCompany ? 'text-secondary' : 'text-blue-700'}`}>
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
