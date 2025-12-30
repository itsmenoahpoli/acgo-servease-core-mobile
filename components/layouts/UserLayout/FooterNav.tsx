import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FooterNavProps {
	showFooter?: boolean;
}

export function FooterNav({ showFooter = true }: FooterNavProps) {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	if (!showFooter) {
		return null;
	}

	return (
		<View className="bg-secondary border-t border-primary/20" style={{ paddingBottom: insets.bottom }}>
			<View className="flex-row items-center justify-around p-4">
				<Pressable className="items-center">
					<Ionicons name="storefront-outline" size={20} color="white" />
				</Pressable>
				<Pressable className="items-center">
					<Ionicons name="cart-outline" size={20} color="white" />
				</Pressable>
				<Pressable className="items-center">
					<Ionicons name="heart-outline" size={20} color="white" />
				</Pressable>
				<Pressable
					onPress={() => router.push('/user/customer/profile')}
					className="items-center"
				>
					<Ionicons name="person-outline" size={24} color="white" />
				</Pressable>
			</View>
		</View>
	);
}

