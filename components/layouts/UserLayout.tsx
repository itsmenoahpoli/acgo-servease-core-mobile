import { ReactNode } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface UserLayoutProps {
	children: ReactNode;
	title?: string;
	onMenuPress?: () => void;
	onSearchPress?: () => void;
	onNotificationPress?: () => void;
	showHeader?: boolean;
	showFooter?: boolean;
	statusBarStyle?: 'light' | 'dark' | 'auto';
}

const STATUS_BAR_BG = '#7a0f1d'; // secondary

export function UserLayout({ children, statusBarStyle = 'light' }: UserLayoutProps) {
	const insets = useSafeAreaInsets();

	return (
		<>
			<StatusBar style={statusBarStyle} backgroundColor={STATUS_BAR_BG} />
			<View className="flex-1 bg-white">
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: insets.top,
						backgroundColor: STATUS_BAR_BG,
					}}
				/>
				<View style={{ flex: 1, paddingTop: insets.top }}>
					<View className="flex-1 bg-white">{children}</View>
				</View>
			</View>
		</>
	);
}
