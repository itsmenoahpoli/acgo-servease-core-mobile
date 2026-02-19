import { Stack } from 'expo-router';

export default function CustomerLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
				gestureEnabled: true,
				fullScreenGestureEnabled: true,
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="service/[id]" options={{ headerShown: false }} />
		</Stack>
	);
}
