import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setOnUnauthorized } from '@/services/httpClient';
import '../global.css';

const queryClient = new QueryClient();

export default function Layout() {
	const router = useRouter();

	useEffect(() => {
		setOnUnauthorized(() => router.replace('/auth/signin'));
		return () => setOnUnauthorized(null);
	}, [router]);

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
