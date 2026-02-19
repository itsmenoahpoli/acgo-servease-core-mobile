import { View } from 'react-native';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

const queryClient = new QueryClient();

export default function Layout() {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider className="flex-1">
				<View className="flex-1 bg-white">
					<Stack
						screenOptions={{
							headerShown: false,
							animation: 'slide_from_right',
							gestureEnabled: true,
							fullScreenGestureEnabled: true,
						}}
					/>
				</View>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
