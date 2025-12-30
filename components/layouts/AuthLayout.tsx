import { ReactNode } from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SPLASH_BG } from '@/assets';

interface AuthLayoutProps {
	children: ReactNode;
	scrollable?: boolean;
}

export function AuthLayout({ children, scrollable = true }: AuthLayoutProps) {
	const content = (
		<View className="flex-1 relative bg-[rgba(0,0,0,0.7)]">
			<SafeAreaView className="flex-1">
				{scrollable ? (
					<ScrollView
						contentContainerStyle={{ flexGrow: 1 }}
						className="flex-1 px-6"
						keyboardShouldPersistTaps="handled"
					>
						{children}
					</ScrollView>
				) : (
					<View className="flex-1 px-6">{children}</View>
				)}
			</SafeAreaView>
		</View>
	);

	return (
		<>
			<StatusBar style="light" />
			<ImageBackground source={SPLASH_BG} resizeMethod="scale" resizeMode="cover" className="flex-1">
				{content}
			</ImageBackground>
		</>
	);
}

