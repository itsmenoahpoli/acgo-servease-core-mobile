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
	/** Status bar style for this screen (e.g. 'light' for dark header). */
	statusBarStyle?: 'light' | 'dark' | 'auto';
}

const FOOTER_BAR_HEIGHT = 48;
const STATUS_BAR_BG = '#7a0f1d'; // secondary

export function UserLayout({
	children,
	title = 'Store',
	onMenuPress,
	onNotificationPress,
	showHeader = true,
	showFooter = true,
	statusBarStyle = 'light',
}: UserLayoutProps) {
	const insets = useSafeAreaInsets();
	const footerHeight = FOOTER_BAR_HEIGHT + insets.bottom;

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
					{showHeader && <HeaderNav title={title} onMenuPress={onMenuPress} onNotificationPress={onNotificationPress} />}
					<View
						className="flex-1 bg-white"
						style={showFooter ? { paddingBottom: footerHeight } : undefined}
					>
						{children}
					</View>
					{showFooter && (
						<View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
							<FooterNav showFooter={true} />
						</View>
					)}
				</View>
			</View>
		</>
	);
}
