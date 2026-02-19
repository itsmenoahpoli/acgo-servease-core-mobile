import { View, Text } from 'react-native';
import { UserLayout } from '@/components/layouts/UserLayout';

export default function Favorites() {
	return (
		<UserLayout showHeader={false} showFooter={false}>
			<View className="flex-1 items-center justify-center p-4">
				<Text className="text-lg text-gray-600">Favorites</Text>
				<Text className="text-sm text-gray-400 mt-2">Your favorites list is empty</Text>
			</View>
		</UserLayout>
	);
}
