import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Image, ImageBackground, Text, Pressable, InteractionManager } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { BRAND_LOGO, SPLASH_BG } from '@/assets';

export default function () {
	const insets = useSafeAreaInsets();
	const router = useRouter();

	useEffect(() => {
		SplashScreen.hideAsync();
		InteractionManager.runAfterInteractions(() => {
			router.push('/user/customer/home');
		});
	}, []);

	return (
		<ImageBackground source={SPLASH_BG} resizeMethod="scale" resizeMode="cover" className="flex-1">
			<View className="flex-1 items-center relative bg-[rgba(0,0,0,0.45)]">
				<SafeAreaView className="flex-1 w-full">
					<View className="flex-col w-full h-full pb-8">
						<View className="flex items-center">
							<Image
								source={BRAND_LOGO}
								resizeMethod="resize"
								resizeMode="contain"
								className="h-32 w-32 mb-8 mt-10 rounded-2xl"
							/>
							<Text className="text-2xl text-white font-bold mb-5">SERVEASE PLATFORM</Text>
						</View>

						<View className="flex-row gap-3 mt-auto px-3 pb-5">
							<Pressable className="flex-1 rounded-lg items-center justify-center h-14 border-2 border-primary">
								<Text className="text-xl text-white font-bold">Create Account</Text>
							</Pressable>
							<Pressable className="flex-1 rounded-lg items-center justify-center h-14 bg-primary">
								<Text className="text-xl text-white font-bold">Log In</Text>
							</Pressable>
						</View>
					</View>

					<Text className="text-sm text-white absolute left-5" style={{ bottom: insets.bottom }}>
						Version 0.1.102025.1
					</Text>
				</SafeAreaView>
			</View>
		</ImageBackground>
	);
}
