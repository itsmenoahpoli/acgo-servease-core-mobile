import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Pressable, useWindowDimensions, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';
import { getServiceImageUrl, getServiceProviderType } from '@/types/service';
import type { Service } from '@/types/service';
import { formatPriceAmount } from '@/utils/helpers.util';
import { ServiceCard } from '@/components/modules/services/ServiceListCards';

export default function ServiceDetail() {
	const router = useRouter();
	const params = useLocalSearchParams<{ id?: string; service?: string }>();
	const insets = useSafeAreaInsets();
	const { height: screenHeight } = useWindowDimensions();

	const [parseError, setParseError] = useState<string | null>(null);

	let service: Service | null = null;
	if (params.service) {
		const raw = Array.isArray(params.service) ? params.service[0] : params.service;
		try {
			service = JSON.parse(raw) as Service;
		} catch {
			if (!parseError) {
				setParseError('Failed to read service data.');
			}
		}
	}

	if (!service || parseError) {
		return (
			<UserLayout showHeader={false} showFooter={false}>
				<View className="flex-1 items-center justify-center px-4">
					<Text className="text-lg font-semibold text-gray-900 mb-4">
						{parseError ?? 'Service not found'}
					</Text>
					<Pressable onPress={() => router.back()} className="px-6 py-3 bg-secondary rounded-lg">
						<Text className="text-white font-semibold">Go Back</Text>
					</Pressable>
				</View>
			</UserLayout>
		);
	}

	const imageUrl = getServiceImageUrl(service);
	const providerType = getServiceProviderType(service);
	const isCompany = providerType === 'Company Provider';
	const serviceIncludes = service.serviceIncludes ?? [];
	const about = service.about ?? '';

	return (
		<UserLayout showHeader={false} showFooter={false}>
			<StatusBar style="light" />
			<View className="flex-1 bg-white">
				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					<View className="bg-gray-200 relative" style={{ height: screenHeight * 0.35 }}>
						{imageUrl ? (
							<Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
						) : (
							<View className="flex-1 items-center justify-center">
								<Ionicons name="image-outline" size={64} color="#9CA3AF" />
							</View>
						)}
						<Pressable
							onPress={() => router.back()}
							className="absolute top-4 left-4 bg-white w-10 h-10 rounded-full items-center justify-center"
						>
							<Ionicons name="arrow-back" size={22} color="#111827" />
						</Pressable>
					</View>

					<View className="-mt-8 px-4">
						<ServiceCard service={service} onSelect={() => {}} />

						{serviceIncludes.length > 0 || about ? (
							<View className="bg-white rounded-3xl px-5 pt-6 pb-0 border border-gray-100 mt-3">
								{serviceIncludes.length > 0 && (
									<>
										<Text className="text-xs uppercase text-gray-500 mb-2">Service Included</Text>
										<View className="flex-row flex-wrap gap-2 mb-4">
											{serviceIncludes.map((item) => (
												<View key={item} className="px-4 py-2 bg-gray-100 rounded-full">
													<Text className="text-xs font-semibold text-gray-700">{item}</Text>
												</View>
											))}
										</View>
									</>
								)}

								{about ? (
									<>
										<Text className="text-xs uppercase text-gray-500 mb-2">About</Text>
										<Text className="text-sm text-gray-700 leading-relaxed mb-6">{about}</Text>
									</>
								) : null}

								<View className="pb-32" />
							</View>
						) : null}
					</View>
				</ScrollView>

				<View
					className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 pt-4"
					style={{ paddingBottom: insets.bottom + 16 }}
				>
					<View className="flex-row items-center justify-between mb-4">
						<View>
							<Text className="text-xs text-gray-500">Starting at</Text>
							<Text className="text-xl font-bold text-gray-900">
								{formatPriceAmount(service.price) || service.price}
							</Text>
						</View>
						<View className={`px-3 py-1 rounded-full ${isCompany ? 'bg-secondary/10' : 'bg-blue-50'}`}>
							<Text className={`text-xs font-semibold ${isCompany ? 'text-secondary' : 'text-blue-700'}`}>
								{providerType}
							</Text>
						</View>
					</View>
					<Pressable className="bg-primary rounded-xl py-4 items-center">
						<Text className="text-white font-semibold text-base">BOOK THIS SERVICE</Text>
					</Pressable>
				</View>
			</View>
		</UserLayout>
	);
}
