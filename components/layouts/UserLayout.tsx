import { ReactNode } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderNav } from './UserLayout/HeaderNav';
import { FooterNav } from './UserLayout/FooterNav';

interface UserLayoutProps {
	children: ReactNode;
	title?: string;
	onMenuPress?: () => void;
	onSearchPress?: () => void;
	onNotificationPress?: () => void;
	showHeader?: boolean;
	showFooter?: boolean;
}

export function UserLayout({
	children,
	title = 'Store',
	onMenuPress,
	onNotificationPress,
	showHeader = true,
	showFooter = true,
}: UserLayoutProps) {
	const insets = useSafeAreaInsets();

	return (
		<>
			<StatusBar style="light" />
			<View className="flex-1 bg-white">
				{showHeader && (
					<HeaderNav
						title={title}
						onMenuPress={onMenuPress}
						onNotificationPress={onNotificationPress}
					/>
				)}
				<View className="flex-1 bg-white">{children}</View>
				<FooterNav showFooter={showFooter} />
			</View>
		</>
	);
}

