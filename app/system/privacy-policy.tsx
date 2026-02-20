import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function PrivacyPolicy() {
	const router = useRouter();

	return (
		<View className="flex-1 bg-white">
			<StatusBar style="dark" />
			<SafeAreaView className="flex-1">
				<View className="flex-row items-center justify-between px-4 border-b border-gray-200">
					<Text className="text-xl font-bold text-gray-900">Privacy Policy</Text>
					<Pressable onPress={() => router.back()} className="w-8 h-8 items-center justify-center">
						<Text className="text-2xl text-gray-600">×</Text>
					</Pressable>
				</View>

				<ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">1. Information We Collect</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							We collect information that you provide directly to us, including when you create an account, make a
							purchase, request customer support, or otherwise communicate with us. This may include:
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Name, email address, phone number, and postal address
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Payment information and transaction history
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">• Account credentials and preferences</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4 ml-4">
							• Any other information you choose to provide
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">2. How We Use Your Information</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">We use the information we collect to:</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Provide, maintain, and improve our services
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Process transactions and send related information
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Send you technical notices, updates, and support messages
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Respond to your comments, questions, and requests
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4 ml-4">
							• Monitor and analyze trends, usage, and activities
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">3. Information Sharing</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							We do not sell, trade, or rent your personal information to third parties. We may share your information
							only in the following circumstances:
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• With service providers who assist us in operating our platform
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• To comply with legal obligations or respond to legal process
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• To protect the rights, property, or safety of Servease Platform, our users, or others
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4 ml-4">
							• In connection with a merger, acquisition, or sale of assets
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">4. Data Security</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							We implement appropriate technical and organizational security measures to protect your personal
							information. However, no method of transmission over the Internet or electronic storage is 100% secure,
							and we cannot guarantee absolute security.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">5. Your Rights</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">You have the right to:</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Access and receive a copy of your personal data
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Rectify inaccurate or incomplete personal data
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Request deletion of your personal data
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Object to processing of your personal data
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4 ml-4">
							• Request restriction of processing your personal data
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">6. Cookies and Tracking Technologies</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							We use cookies and similar tracking technologies to track activity on our platform and hold certain
							information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
							sent.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">7. Children&apos;s Privacy</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							Our service is not intended for children under the age of 13. We do not knowingly collect personal
							information from children under 13. If you are a parent or guardian and believe your child has provided us
							with personal information, please contact us.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">8. Changes to This Policy</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
							Privacy Policy on this page and updating the &quot;Last updated&quot; date.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">9. Contact Us</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							If you have any questions about this Privacy Policy, please contact us at privacy@servease.com.
						</Text>
					</View>

					<View className="mb-8">
						<Text className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
