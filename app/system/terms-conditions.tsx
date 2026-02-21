import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TermsConditions() {
	const router = useRouter();

	return (
		<View className="flex-1 bg-white">
			<StatusBar style="dark" />
			<SafeAreaView className="flex-1">
				<View className="flex-row items-center justify-between px-4 pb-4 border-b border-gray-200">
					<Text className="text-xl font-bold text-gray-900">Terms & Conditions</Text>
					<Pressable onPress={() => router.back()} className="w-8 h-8 items-center justify-center">
						<Text className="text-2xl text-gray-600">×</Text>
					</Pressable>
				</View>

				<ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							By accessing and using the Servease Platform, you accept and agree to be bound by the terms and provision
							of this agreement. If you do not agree to abide by the above, please do not use this service.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">2. Use License</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							Permission is granted to temporarily download one copy of the materials on Servease Platform for personal,
							non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
							this license you may not:
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">• Modify or copy the materials</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Use the materials for any commercial purpose or for any public display
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• Attempt to decompile or reverse engineer any software contained on the platform
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4 ml-4">
							• Remove any copyright or other proprietary notations from the materials
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">3. User Account</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							You are responsible for maintaining the confidentiality of your account and password. You agree to accept
							responsibility for all activities that occur under your account or password. You must notify us
							immediately of any unauthorized use of your account.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">4. Prohibited Uses</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">You may not use our service:</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• In any way that violates any applicable national or international law or regulation
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• To transmit, or procure the sending of, any advertising or promotional material
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-2 ml-4">
							• To impersonate or attempt to impersonate the company, a company employee, another user, or any other
							person or entity
						</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4 ml-4">
							• In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent,
							or harmful
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">5. Service Availability</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							We reserve the right to withdraw or amend our service, and any service or material we provide, in our sole
							discretion without notice. We will not be liable if, for any reason, all or any part of the service is
							unavailable at any time or for any period.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">6. Limitation of Liability</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							In no event shall Servease Platform, nor its directors, employees, partners, agents, suppliers, or
							affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including
							without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your
							use of the service.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">7. Changes to Terms</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
							is material, we will provide at least 30 days notice prior to any new terms taking effect.
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-lg font-bold text-gray-900 mb-3">8. Contact Information</Text>
						<Text className="text-base text-gray-700 leading-6 mb-4">
							If you have any questions about these Terms & Conditions, please contact us at support@servease.com.
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
