import { View, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FooterNavProps {
	showFooter?: boolean;
}

const NAV_ITEMS: { path: string; icon: keyof typeof Ionicons.glyphMap; iconActive: keyof typeof Ionicons.glyphMap }[] =
	[
		{ path: '/user/customer/home', icon: 'storefront-outline', iconActive: 'storefront' },
		{ path: '/user/customer/cart', icon: 'cart-outline', iconActive: 'cart' },
		{ path: '/user/customer/favorites', icon: 'heart-outline', iconActive: 'heart' },
		{ path: '/user/customer/profile', icon: 'person-outline', iconActive: 'person' },
	];

function isActive(pathname: string, itemPath: string): boolean {
	if (itemPath === '/user/customer/home') {
		return (
			pathname === '/user/customer' || pathname === '/user/customer/home' || pathname.startsWith('/user/customer/home')
		);
	}
	return pathname === itemPath || pathname.startsWith(itemPath + '/');
}

export function FooterNav({ showFooter = true }: FooterNavProps) {
	const router = useRouter();
	const pathname = usePathname();
	const insets = useSafeAreaInsets();

	if (!showFooter) {
		return null;
	}

	return (
		<View className="bg-secondary border-t border-primary/20" style={{ paddingBottom: insets.bottom }}>
			<View className="flex-row items-center justify-around px-4 py-3">
				{NAV_ITEMS.map((item) => {
					const active = isActive(pathname, item.path);
					const iconSize = item.path.includes('profile') ? 24 : 20;

					return (
						<Pressable
							key={item.path}
							onPress={() => router.push(item.path as any)}
							className="items-center justify-center"
						>
							<Ionicons name={active ? item.iconActive : item.icon} size={iconSize} color="white" />
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
