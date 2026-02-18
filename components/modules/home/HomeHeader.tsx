import { View, Text, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HomeHeaderProps {
	locationLabel: string;
	onProfilePress: () => void;
}

export function HomeHeader({ locationLabel, onProfilePress }: HomeHeaderProps) {
	return (
		<View className="px-4 py-3">
			<View className="flex-row items-center justify-between mb-3">
				<Pressable className="flex-row items-center">
					<Text className="text-sm text-white mr-1">Location:</Text>
					<Text className="text-sm text-white font-semibold mr-1">{locationLabel}</Text>
					<Ionicons name="chevron-down" size={12} color="white" />
				</Pressable>
				<Pressable onPress={onProfilePress}>
					<View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center relative">
						<Ionicons name="person" size={24} color="#6B7280" />
						<View className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-secondary" />
					</View>
				</Pressable>
			</View>

			<View className="flex-row items-center">
				<View className="flex-1 flex-row items-center bg-white/20 rounded-lg px-3 py-2 mr-2">
					<Ionicons name="search" size={20} color="white" />
					<TextInput
						placeholder="Find Service Here"
						placeholderTextColor="rgba(255, 255, 255, 0.7)"
						className="flex-1 ml-2 text-white"
					/>
				</View>
				<Pressable className="w-10 h-10 bg-primary rounded-lg items-center justify-center">
					<Ionicons name="options-outline" size={20} color="white" />
				</Pressable>
			</View>
		</View>
	);
}
