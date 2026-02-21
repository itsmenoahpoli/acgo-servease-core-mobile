import { useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';
import { BUILD_VERSION } from '@/constants/app';
import { useAuthProfile } from '@/hooks/useAuthProfile';
import { authTokenStorage } from '@/services/auth-token-storage';

interface SettingsItemProps {
	icon: string;
	label: string;
	value?: string;
	onPress?: () => void;
}

function SettingsItem({ icon, label, value, onPress }: SettingsItemProps) {
	return (
		<Pressable onPress={onPress} className="flex-row items-center justify-between py-4 border-b border-gray-100">
			<View className="flex-row items-center flex-1">
				<View className="w-10 h-10 items-center justify-center mr-3">
					<Ionicons name={icon as any} size={24} color="#374151" />
				</View>
				<Text className="text-base text-gray-900 flex-1">{label}</Text>
			</View>
			<View className="flex-row items-center">
				{value && <Text className="text-sm text-gray-500 mr-2">{value}</Text>}
				<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
			</View>
		</Pressable>
	);
}

function getDisplayName(profile: { name?: string; firstName?: string; lastName?: string } | null): string {
	if (!profile) return 'Customer';
	if (profile.name?.trim()) return profile.name.trim();
	const first = profile.firstName?.trim() ?? '';
	const last = profile.lastName?.trim() ?? '';
	return [first, last].filter(Boolean).join(' ') || 'Customer';
}

type ListModalType = 'transactions' | 'orders' | null;

function ListModal({
	visible,
	title,
	emptyMessage,
	emptyIcon = 'document-text-outline',
	onClose,
}: {
	visible: boolean;
	title: string;
	emptyMessage: string;
	emptyIcon?: string;
	onClose: () => void;
}) {
	const insets = useSafeAreaInsets();
	return (
		<Modal visible={visible} animationType="slide" statusBarTranslucent>
			<StatusBar style="dark" />
			<View className="flex-1 bg-white">
				<View
					className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200"
					style={{ paddingTop: insets.top, paddingBottom: 16 }}
				>
					<Text className="text-xl font-bold text-gray-900">{title}</Text>
					<Pressable onPress={onClose} className="w-10 h-10 items-center justify-center" hitSlop={8}>
						<Ionicons name="close" size={28} color="#374151" />
					</Pressable>
				</View>
				<ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
					<View className="flex-1 items-center justify-center py-16">
						<Ionicons name={emptyIcon as any} size={64} color="#D1D5DB" />
						<Text className="text-lg font-medium text-gray-500 mt-4">{emptyMessage}</Text>
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
}

export default function Profile() {
	const router = useRouter();
	const { data: profile, isLoading, isError } = useAuthProfile();
	const [listModalType, setListModalType] = useState<ListModalType>(null);

	const handleSignout = () => {
		Alert.alert('Sign out', 'Are you sure you want to sign out?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Sign out',
				style: 'destructive',
				onPress: async () => {
					await authTokenStorage.clearTokens();
					router.push('/auth/signin');
				},
			},
		]);
	};
	const handleEditProfile = () => console.log('Edit profile picture');

	const displayName = getDisplayName(profile ?? null);
	const displayId = profile?.id ? profile.id.slice(0, 8) : '—';

	return (
		<UserLayout showHeader={false} showFooter={false}>
			<View className="flex-1 bg-gray-50">
				<View className="bg-white border-b border-gray-100 px-4 pt-4" style={{ paddingBottom: 12 }}>
					<Text className="text-lg text-center font-semibold text-gray-900">Profile</Text>
				</View>

				<ScrollView className="flex-1 bg-white">
					<View className="px-4 py-6">
						<View className="items-center mb-6">
							<View className="relative mb-4">
								<View className="w-28 h-28 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
									<Ionicons name="person" size={56} color="#9CA3AF" />
								</View>
								<Pressable
									onPress={handleEditProfile}
									className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 items-center justify-center border-2 border-white"
								>
									<Ionicons name="create-outline" size={14} color="white" />
								</Pressable>
							</View>
							{isLoading ? (
								<View className="mb-4">
									<ActivityIndicator size="small" color="#7a0f1d" />
								</View>
							) : isError ? (
								<Text className="text-sm text-gray-500 mb-4">Unable to load profile</Text>
							) : null}
							<Text className="text-2xl font-bold text-gray-900 mb-1 text-center">{displayName}</Text>
							<Text className="text-sm text-gray-600 mb-3">ID: {displayId}</Text>
							<View className="flex-row items-center bg-primary px-4 py-2 rounded-full">
								<Ionicons name="checkmark-circle" size={18} color="white" />
								<Text className="text-sm text-white font-semibold ml-2">Customer Account</Text>
							</View>
						</View>

						{profile ? (
							<View className="mt-4">
								<Text className="text-lg font-semibold text-gray-900 mb-2">Profile details</Text>
								<View className="bg-white rounded-lg border border-gray-100">
									<SettingsItem icon="mail-outline" label="Email" value={profile.email} />
									<SettingsItem icon="call-outline" label="Phone" value={profile.phoneNumber} />
									<SettingsItem icon="location-outline" label="Address" value={profile.address} />
								</View>
							</View>
						) : null}

						<View className="mt-8">
							<Text className="text-lg font-semibold text-gray-900 mb-2">General</Text>
							<View className="bg-white rounded-lg">
								<SettingsItem icon="help-circle-outline" label="FAQs" onPress={() => {}} />
								<SettingsItem
									icon="headset-outline"
									label="Customer Support"
									onPress={() => router.push('/user/customer/support')}
								/>
								<SettingsItem icon="flag-outline" label="Report a Problem" onPress={() => {}} />
							</View>
						</View>

						<View className="mt-8">
							<Text className="text-lg font-semibold text-gray-900 mb-2">Settings</Text>
							<View className="bg-white rounded-lg">
								<SettingsItem
									icon="document-text-outline"
									label="Transactions"
									onPress={() => setListModalType('transactions')}
								/>
								<SettingsItem icon="clipboard-outline" label="Orders" onPress={() => setListModalType('orders')} />
								<SettingsItem icon="notifications-outline" label="Notification" onPress={() => {}} />
								<SettingsItem icon="sunny-outline" label="Theme" value="Light" onPress={() => {}} />
								<SettingsItem
									icon="information-circle-outline"
									label="Terms & Conditions"
									onPress={() => router.push('/system/terms-conditions')}
								/>
								<SettingsItem
									icon="shield-checkmark-outline"
									label="Privacy Policy"
									onPress={() => router.push('/system/privacy-policy')}
								/>
							</View>
						</View>

						<View className="mt-8 mb-6">
							<Pressable
								onPress={handleSignout}
								className="w-full py-4 items-center justify-center active:opacity-90 rounded-xl border border-secondary"
							>
								<Text className="text-secondary text-base font-semibold">SIGN OUT</Text>
							</Pressable>

							<Text className="text-center text-gray-500 mt-5">Build version: {BUILD_VERSION}</Text>
						</View>
					</View>
				</ScrollView>
			</View>

			<ListModal
				visible={listModalType === 'transactions'}
				title="Transactions"
				emptyMessage="No transactions yet"
				onClose={() => setListModalType(null)}
			/>
			<ListModal
				visible={listModalType === 'orders'}
				title="Orders"
				emptyMessage="No orders yet"
				emptyIcon="clipboard-outline"
				onClose={() => setListModalType(null)}
			/>
		</UserLayout>
	);
}
