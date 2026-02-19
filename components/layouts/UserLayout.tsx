import { ReactNode } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
	/** Status bar style for this screen (e.g. 'light' for dark header). */
	statusBarStyle?: 'light' | 'dark' | 'auto';
}

export function UserLayout({
	children,
	title = 'Store',
	onMenuPress,
	onNotificationPress,
	showHeader = true,
	showFooter = true,
	statusBarStyle = 'dark',
}: UserLayoutProps) {
	return (
		<>
			<StatusBar style={statusBarStyle} />
			<View className="flex-1 bg-white">
				{showHeader && <HeaderNav title={title} onMenuPress={onMenuPress} onNotificationPress={onNotificationPress} />}
				<View className="flex-1 bg-white">{children}</View>
				<FooterNav showFooter={showFooter} />
			</View>
		</>
	);
}
