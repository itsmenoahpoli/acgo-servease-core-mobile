import { ScrollView, Pressable, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ServiceCategory } from '@/types/service';

interface ServiceCategoryChipsProps {
	categories: ServiceCategory[];
	onSelect: (category: ServiceCategory) => void;
}

export function ServiceCategoryChips({ categories, onSelect }: ServiceCategoryChipsProps) {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
			{categories.map((category) => (
				<Pressable key={category.id} onPress={() => onSelect(category)} className="items-center mr-4">
					<View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-2">
						<Ionicons name={category.icon as any} size={28} color="#7a0f1d" />
					</View>
					<Text className="text-xs text-gray-700 text-center">{category.name}</Text>
				</Pressable>
			))}
		</ScrollView>
	);
}

