import { Pressable, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import { type ServiceCategory } from '@/types/service';

interface ServiceCategoryChipsProps {
	categories: ServiceCategory[];
	isLoading?: boolean;
	onSelect: (category: ServiceCategory) => void;
}

const COLUMNS = 4;
const SHIMMER_PLACEHOLDERS = 8;

function formatCategoryLabel(name: string): string {
	const words = name.trim().split(/\s+/);
	if (words.length < 3) return name;
	const mid = Math.ceil(words.length / 2);
	return words.slice(0, mid).join(' ') + '\n' + words.slice(mid).join(' ');
}

function getCategoryIcon(categoryName: ServiceCategory['name']) {
	switch (categoryName.toLowerCase()) {
		case 'cleaning':
			return <MaterialIcons name="cleaning-services" size={28} color="#7a0f1d" />;
		case 'hvac':
			return <MaterialIcons name="hvac" size={28} color="#7a0f1d" />;
		case 'painting':
			return <MaterialIcons name="format-paint" size={28} color="#7a0f1d" />;
		case 'landscaping':
			return <MaterialIcons name="grass" size={28} color="#7a0f1d" />;
		case 'handyman':
			return <Ionicons name="hammer" size={28} color="#7a0f1d" />;
		case 'electrical':
			return <MaterialIcons name="electric-bolt" size={28} color="#7a0f1d" />;
		case 'water':
			return <MaterialIcons name="water-drop" size={28} color="#7a0f1d" />;
		case 'plumbing':
			return <MaterialIcons name="plumbing" size={28} color="#7a0f1d" />;
		case 'moving & delivery':
			return <MaterialIcons name="house" size={28} color="#7a0f1d" />;

		default:
			return <></>;
	}
}

export function ServiceCategoryChips({ categories, isLoading = false, onSelect }: ServiceCategoryChipsProps) {
	if (isLoading) {
		return (
			<ShimmerProvider duration={1200}>
				<View className="flex-row flex-wrap">
					{Array.from({ length: SHIMMER_PLACEHOLDERS }).map((_, i) => (
						<View key={i} className="w-1/4 items-center mb-4">
							<Shimmer
								style={{
									width: 64,
									height: 64,
									borderRadius: 12,
									backgroundColor: '#eee',
									marginBottom: 4,
								}}
							/>
							<Shimmer
								style={{
									width: 48,
									height: 12,
									borderRadius: 4,
									backgroundColor: '#eee',
								}}
							/>
						</View>
					))}
				</View>
			</ShimmerProvider>
		);
	}

	return (
		<View className="flex-row flex-wrap">
			{categories.slice(0, 8).map((category) => (
				<Pressable
					key={category.id}
					onPress={() => onSelect(category)}
					className="items-center mb-4"
					style={{ width: `${100 / COLUMNS}%` }}
				>
					<View className="w-20 h-20 rounded-lg bg-gray-100 items-center justify-center mb-1">
						{/* <Ionicons name={PLACEHOLDER_ICON} size={28} color="#7a0f1d" /> */}
						{getCategoryIcon(category.name)}
					</View>
					<Text className="text-sm text-black text-center">{formatCategoryLabel(category.name)}</Text>
				</Pressable>
			))}
		</View>
	);
}
