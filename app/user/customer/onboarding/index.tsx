import { useState, useRef } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BRAND_LOGO } from '@/assets';

interface OnboardingSlide {
	title: string;
	description: string;
	icon: string;
}

const slides: OnboardingSlide[] = [
	{
		title: 'Find Trusted Service Providers',
		description: 'Browse through a wide range of professional service providers. Book services that match your needs with ease and confidence.',
		icon: '🔍',
	},
	{
		title: 'Become a Service Provider',
		description: 'Join our marketplace and showcase your services to thousands of customers. Grow your business and reach new clients.',
		icon: '💼',
	},
	{
		title: 'Seamless Marketplace Experience',
		description: 'Connect, communicate, and transact smoothly. Our platform makes it easy for customers and providers to work together.',
		icon: '✨',
	},
];

export default function Onboarding() {
	const router = useRouter();
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollViewRef = useRef<ScrollView>(null);

	const handleScroll = (event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffsetX / SCREEN_WIDTH);
		if (index !== currentIndex && index >= 0 && index < slides.length) {
			setCurrentIndex(index);
		}
	};


	const handleNext = () => {
		if (currentIndex < slides.length - 1) {
			const nextIndex = currentIndex + 1;
			scrollViewRef.current?.scrollTo({
				x: nextIndex * SCREEN_WIDTH,
				animated: true,
			});
		} else {
			handleGetStarted();
		}
	};

	const handleGetStarted = () => {
		router.push('/user/customer/home');
	};

	const handleSkip = () => {
		router.push('/auth/signup');
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1">
				<View className="flex-row items-center justify-between px-6 pt-4">
					<View className="flex-row items-center">
						<Image
							source={BRAND_LOGO}
							resizeMethod="resize"
							resizeMode="contain"
							className="h-8 w-8 mr-2 rounded-lg"
						/>
						<Text className="text-lg font-bold text-gray-900">Servease</Text>
					</View>
					{currentIndex < slides.length - 1 && (
						<Pressable onPress={handleSkip}>
							<Text className="text-base text-gray-600 font-medium">Skip</Text>
						</Pressable>
					)}
				</View>

				<ScrollView
					ref={scrollViewRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={handleScroll}
					onMomentumScrollEnd={handleScroll}
					scrollEventThrottle={16}
					className="flex-1"
					contentContainerStyle={{
						width: SCREEN_WIDTH * slides.length,
					}}
					style={{ flex: 1 }}
				>
					{slides.map((slide, index) => (
						<View
							key={index}
							style={{
								width: SCREEN_WIDTH,
								flex: 1,
							}}
							className="px-6 justify-center items-center"
						>
							<View className="w-32 h-32 rounded-full bg-primary/10 items-center justify-center mb-8">
								<Text className="text-6xl">{slide.icon}</Text>
							</View>

							<Text className="text-3xl font-bold text-gray-900 text-center mb-4">
								{slide.title}
							</Text>

							<Text className="text-base text-gray-600 text-center leading-6 px-4">
								{slide.description}
							</Text>
						</View>
					))}
				</ScrollView>

				<View className="px-6 pb-8">
					<View className="flex-row items-center justify-center mb-6 gap-2">
						{slides.map((_, index) => (
							<View
								key={index}
								className={`h-2 rounded-full ${
									index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'
								}`}
							/>
						))}
					</View>

					<Pressable
						onPress={handleNext}
						className="bg-primary rounded-lg items-center justify-center h-14"
					>
						<Text className="text-white text-lg font-bold">
							{currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
						</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}

