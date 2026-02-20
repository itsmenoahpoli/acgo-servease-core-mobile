import { View, Text } from 'react-native';
import { UserLayout } from '@/components/layouts/UserLayout';

export default function Favorites() {
	return (
		<UserLayout showHeader={false} showFooter={false}>
			<View className="flex-1 bg-gray-50">
				<View className="bg-white border-b border-gray-100 px-4 pt-4" style={{ paddingBottom: 12 }}>
					<Text className="text-lg text-center font-semibold text-gray-900">Favorites</Text>
				</View>
				<View className="flex-1 items-center justify-center p-4">
					<Text className="text-lg text-gray-600">Favorites</Text>
					<Text className="text-sm text-gray-400 mt-2">Your favorites list is empty</Text>
				</View>
			</View>
		</UserLayout>
	);
}
