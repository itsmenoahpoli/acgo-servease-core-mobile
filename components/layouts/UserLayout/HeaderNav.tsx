import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HeaderNavProps {
	title?: string;
	onMenuPress?: () => void;
	onNotificationPress?: () => void;
}

export function HeaderNav({ title = 'Store', onMenuPress, onNotificationPress }: HeaderNavProps) {
	const insets = useSafeAreaInsets();

	const handleMenuPress = () => {
		if (onMenuPress) {
			onMenuPress();
		}
	};

	const handleNotificationPress = () => {
		if (onNotificationPress) {
			onNotificationPress();
		}
	};

	return (
		<View className="bg-secondary" style={{ paddingTop: insets.top }}>
			<View className="bg-secondary">
				<View className="flex-row items-center justify-between px-4 pb-3">
					<Pressable onPress={handleMenuPress} className="p-2">
						<Ionicons name="menu-outline" size={24} color="white" />
					</Pressable>

					<Text className="text-white text-xl uppercase font-semibold">{title}</Text>

					<View className="flex-row items-center gap-4">
						<Pressable onPress={handleNotificationPress} className="p-2">
							<Ionicons name="notifications-outline" size={24} color="white" />
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
}
