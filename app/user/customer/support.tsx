import { View, Text, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';

// TODO: Fix keyboard offset on iOS

export default function CustomerSupport() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const bottomInset = Math.max(insets.bottom, 8);

	return (
		<UserLayout showHeader={false} showFooter={false}>
			<View className="flex-1 bg-gray-50">
				<View
					className="bg-white border-b border-gray-100 px-4 pt-4 flex-row items-center"
					style={{ paddingBottom: 12 }}
				>
					<Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2" hitSlop={8}>
						<Ionicons name="chevron-back" size={28} color="#374151" />
					</Pressable>
					<Text className="text-lg font-semibold text-gray-900 flex-1 text-center">Customer Support</Text>
					<View className="w-10" />
				</View>

				<KeyboardAvoidingView
					className="flex-1"
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					keyboardVerticalOffset={0}
				>
					<ScrollView
						className="flex-1 bg-white"
						contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 24 + bottomInset }}
						keyboardShouldPersistTaps="handled"
					>
						<View className="flex-1 items-center justify-center py-16">
							<Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
							<Text className="text-base text-gray-500 mt-4 text-center">
								Chat with our AI support assistant. Your messages will appear here.
							</Text>
						</View>
					</ScrollView>

					<View
						className="flex-row items-end border-t border-gray-100 bg-gray-50 px-4 pt-3"
						style={{ paddingBottom: bottomInset }}
					>
						<TextInput
							className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-3 text-base text-gray-900 max-h-32"
							placeholder="Type a message..."
							placeholderTextColor="#9CA3AF"
							multiline
							editable
						/>
						<Pressable className="ml-3 w-12 h-12 rounded-full bg-primary items-center justify-center">
							<Ionicons name="send" size={22} color="white" />
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</View>
		</UserLayout>
	);
}
