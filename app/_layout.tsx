import { View } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function Layout() {
	return (
		<SafeAreaProvider className="flex-1">
			<View className="flex-1 bg-white">
				<Slot />
			</View>
		</SafeAreaProvider>
	);
}
