import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';
import { DatePicker } from '@/components/ui/DatePicker';
import { TimePicker } from '@/components/ui/TimePicker';
import { useAuthProfile } from '@/hooks/useAuthProfile';
import type { Service } from '@/types/service';
import { formatPriceAmount } from '@/utils/helpers.util';

export default function ServiceCheckout() {
	const router = useRouter();
	const params = useLocalSearchParams<{ id?: string; service?: string }>();
	const insets = useSafeAreaInsets();
	const { data: profile } = useAuthProfile();
	const hasPrefilledLocation = useRef(false);

	const [parseError, setParseError] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);
	const [location, setLocation] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (hasPrefilledLocation.current || !profile?.address?.trim()) return;
		hasPrefilledLocation.current = true;
		setLocation(profile.address.trim());
	}, [profile?.address]);

	let service: Service | null = null;
	if (params.service) {
		const raw = Array.isArray(params.service) ? params.service[0] : params.service;
		try {
			service = JSON.parse(raw) as Service;
		} catch {
			if (!parseError) setParseError('Failed to read service data.');
		}
	}

	if (!service || parseError) {
		return (
			<UserLayout showHeader={false} showFooter={false}>
				<View className="flex-1 items-center justify-center px-4">
					<Text className="text-lg font-semibold text-gray-900 mb-4">{parseError ?? 'Service not found'}</Text>
					<Pressable onPress={() => router.back()} className="px-6 py-3 bg-secondary rounded-lg">
						<Text className="text-white font-semibold">Go Back</Text>
					</Pressable>
				</View>
			</UserLayout>
		);
	}

	const priceNum =
		typeof service.price === 'string' ? parseFloat(service.price.replace(/[^0-9.-]/g, '')) : Number(service.price);
	const subtotal = Number.isNaN(priceNum) ? 0 : priceNum;
	const total = subtotal;

	const canSubmit = selectedDate != null && selectedTime != null && location.trim().length > 0;

	const handleConfirm = async () => {
		if (!canSubmit) return;
		setIsSubmitting(true);
		// TODO: call booking API
		await new Promise((r) => setTimeout(r, 800));
		setIsSubmitting(false);
		router.replace('/user/customer');
	};

	return (
		<UserLayout showHeader={false} showFooter={false}>
			<StatusBar style="light" />
			<View className="flex-1 bg-gray-50">
				<View className="bg-white border-b border-gray-100 px-4 pt-4" style={{ paddingBottom: 16 }}>
					<View className="flex-row items-center justify-between">
						<Pressable onPress={() => router.back()} className="p-2 -ml-2">
							<Ionicons name="arrow-back" size={24} color="#111827" />
						</Pressable>
						<Text className="text-lg font-semibold text-gray-900">Book Service</Text>
						<View className="w-10" />
					</View>
				</View>

				<ScrollView
					className="flex-1"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 200 }}
				>
					<View className="p-4">
						<View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
							<Text className="text-base font-semibold text-gray-900 mb-1">{service.title}</Text>
							<Text className="text-sm text-gray-500 mb-3">{service.provider?.name ?? '—'}</Text>
							<View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
								<Text className="text-sm text-gray-500">Price</Text>
								<Text className="text-base font-semibold text-gray-900">
									{formatPriceAmount(service.price) || service.price}
								</Text>
							</View>
						</View>

						<View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
							<DatePicker
								label="Date"
								value={selectedDate}
								onChange={setSelectedDate}
								placeholder="Select date"
								minimumDate={new Date()}
								containerClassName="mb-3"
							/>
							<TimePicker
								label="Time"
								value={selectedTime}
								onChange={setSelectedTime}
								placeholder="Select time"
							/>
						</View>

						<View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
							<Text className="text-xs uppercase text-gray-500 mb-3">Service location</Text>
							<TextInput
								value={location}
								onChangeText={setLocation}
								placeholder="Enter address or location"
								placeholderTextColor="#9CA3AF"
								className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
								multiline
								numberOfLines={2}
							/>
						</View>

						<View className="bg-white rounded-2xl p-4 border border-gray-100">
							<Text className="text-xs uppercase text-gray-500 mb-3">Pricing</Text>
							<View className="flex-row justify-between py-2">
								<Text className="text-sm text-gray-600">Subtotal</Text>
								<Text className="text-sm text-gray-900">{formatPriceAmount(subtotal)}</Text>
							</View>
							<View className="flex-row justify-between py-2 border-t border-gray-100">
								<Text className="text-base font-semibold text-gray-900">Total</Text>
								<Text className="text-base font-semibold text-gray-900">{formatPriceAmount(total)}</Text>
							</View>
						</View>
					</View>
				</ScrollView>

				<View
					className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 pt-4"
					style={{ paddingBottom: insets.bottom + 16 }}
				>
					<View className="flex-row items-center justify-between mb-3">
						<Text className="text-sm text-gray-500">Total</Text>
						<Text className="text-xl font-bold text-gray-900">{formatPriceAmount(total)}</Text>
					</View>
					<Pressable
						onPress={handleConfirm}
						disabled={!canSubmit || isSubmitting}
						className={`rounded-xl py-4 items-center ${canSubmit && !isSubmitting ? 'bg-primary' : 'bg-gray-300'}`}
					>
						<Text className="text-white font-semibold text-base">
							{isSubmitting ? <ActivityIndicator /> : 'CONFIRM BOOKING'}
						</Text>
					</Pressable>
				</View>
			</View>
		</UserLayout>
	);
}
