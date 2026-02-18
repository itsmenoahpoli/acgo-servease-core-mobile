import { useEffect, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import { type ServiceCategory } from '@/types/service';
import { serviceCategoriesService } from '@/services/service-categories.service';

interface ServiceCategoryChipsProps {
	refreshKey?: number;
	onSelect: (category: ServiceCategory) => void;
}

const COLUMNS = 4;
const SHIMMER_PLACEHOLDERS = 8;
const PLACEHOLDER_ICON: keyof typeof Ionicons.glyphMap = 'pricetag-outline';
const LOADING_DELAY_MS = 300;

export function ServiceCategoryChips({ refreshKey = 0, onSelect }: ServiceCategoryChipsProps) {
	const [categories, setCategories] = useState<ServiceCategory[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchCategories = async () => {
		setLoading(true);
		try {
			const data = await serviceCategoriesService.fetchAll();
			setCategories(data);
		} catch {
			setCategories([]);
		} finally {
			setTimeout(() => setLoading(false), LOADING_DELAY_MS);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, [refreshKey]);

	if (loading) {
		return (
			<ShimmerProvider duration={1200}>
				<View className="flex-row flex-wrap">
					{Array.from({ length: SHIMMER_PLACEHOLDERS }).map((_, i) => (
						<View key={i} className="w-1/4 items-center mb-4">
							<Shimmer
								style={{
									width: 64,
									height: 64,
									borderRadius: 32,
									backgroundColor: '#eee',
									marginBottom: 8,
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
			{categories.map((category) => (
				<Pressable
					key={category.id}
					onPress={() => onSelect(category)}
					className="items-center mb-4"
					style={{ width: `${100 / COLUMNS}%` }}
				>
					<View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-2">
						<Ionicons name={PLACEHOLDER_ICON} size={28} color="#7a0f1d" />
					</View>
					<Text className="text-xs text-gray-700 text-center px-1">{category.name}</Text>
				</Pressable>
			))}
		</View>
	);
}
