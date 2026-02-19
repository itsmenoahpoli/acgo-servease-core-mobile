import { View, Text, ScrollView, Pressable, Modal, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ServiceCategory } from '@/types/service';

interface CategoriesModalProps {
	visible: boolean;
	onClose: () => void;
	categories: ServiceCategory[];
	isLoading: boolean;
	onSelectCategory: (category: ServiceCategory) => void;
}

export function CategoriesModal({ visible, onClose, categories, isLoading, onSelectCategory }: CategoriesModalProps) {
	const insets = useSafeAreaInsets();

	return (
		<>
			{visible && <StatusBar style="dark" />}
			<Modal visible={visible} animationType="slide" statusBarTranslucent>
				<View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
					<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
						<View className="w-8" />
						<Text className="flex-1 text-lg font-semibold text-gray-900 text-center">Categories</Text>
						<Pressable onPress={onClose} className="w-8 h-8 items-center justify-center">
							<Ionicons name="close" size={24} color="#374151" />
						</Pressable>
					</View>
					{isLoading && categories.length === 0 ? (
						<View className="flex-1 items-center justify-center">
							<ActivityIndicator size="large" color="#7a0f1d" />
						</View>
					) : (
						<ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
							{categories.map((category) => (
								<Pressable
									key={category.id}
									onPress={() => {
										onSelectCategory(category);
										onClose();
									}}
									className="py-4 border-b border-gray-100 flex-row items-center"
								>
									<Text className="text-base text-gray-900 flex-1">{category.name}</Text>
									<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
								</Pressable>
							))}
						</ScrollView>
					)}
				</View>
			</Modal>
		</>
	);
}
