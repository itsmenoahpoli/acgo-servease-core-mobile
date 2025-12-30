import { ScrollView, Pressable, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Service } from '@/types/service';

interface ServiceHighlightCarouselProps {
	services: Service[];
	onSelect: (service: Service) => void;
	onBook: (service: Service) => void;
}

export function ServiceHighlightCarousel({ services, onSelect, onBook }: ServiceHighlightCarouselProps) {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
			{services.map((service) => (
				<Pressable
					key={service.id}
					onPress={() => onSelect(service)}
					className="w-72 bg-white rounded-xl border border-gray-200 mr-4 overflow-hidden"
				>
					<View className="h-40 bg-gray-200 items-center justify-center">
						<Ionicons name="image-outline" size={48} color="#9CA3AF" />
					</View>
					<View className="p-4">
						<Text className="text-base font-bold text-gray-900 mb-1">{service.title}</Text>
						<View
							className={`self-start px-3 py-1 rounded-full mb-2 ${
								service.providerType === 'Company Provider' ? 'bg-secondary/10' : 'bg-blue-50'
							}`}
						>
							<Text
								className={`text-[10px] font-semibold ${
									service.providerType === 'Company Provider' ? 'text-secondary' : 'text-blue-700'
								}`}
							>
								{service.providerType}
							</Text>
						</View>
						<Text className="text-sm text-gray-600 mb-2">{service.description}</Text>
						<View className="flex-row items-center justify-between">
							<View className="flex-row items-center">
								<Ionicons name="person-outline" size={16} color="#6B7280" />
								<Text className="text-xs text-gray-600 ml-1">{service.provider}</Text>
							</View>
							<View className="flex-row items-center">
								<Ionicons name="star" size={14} color="#FBBF24" />
								<Text className="text-xs text-gray-600 ml-1">{service.rating}</Text>
							</View>
						</View>
						<View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
							<Text className="text-sm font-semibold text-primary">{service.price}</Text>
							<Pressable onPress={() => onBook(service)} className="bg-primary px-4 py-2 rounded-lg">
								<Text className="text-white text-xs font-semibold">Book Now</Text>
							</Pressable>
						</View>
					</View>
				</Pressable>
			))}
		</ScrollView>
	);
}

