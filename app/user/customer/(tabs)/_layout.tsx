import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CustomerTabsLayout() {
	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: '#7a0f1d',
					borderTopColor: 'rgba(122, 15, 29, 0.2)',
					borderTopWidth: 1,
					paddingBottom: insets.bottom,
					height: 48 + insets.bottom,
				},
				tabBarActiveTintColor: '#FF3B30',
				tabBarInactiveTintColor: 'white',
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'storefront' : 'storefront-outline'} size={20} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="bookings"
				options={{
					title: 'Bookings',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={20} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="favorites"
				options={{
					title: 'Favorites',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'heart' : 'heart-outline'} size={20} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
