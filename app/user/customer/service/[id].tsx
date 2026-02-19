import { View, Text, ScrollView, Pressable, useWindowDimensions, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';
import { popularServices } from '@/data/services';
import { getServiceImageUrl, getServiceProviderType } from '@/types/service';
import { formatPriceAmount } from '@/utils/helpers.util';

export default function ServiceDetail() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const service = popularServices.find((item) => item.id === params.id);
	const { height: screenHeight } = useWindowDimensions();

	if (!service) {
		return (
			<UserLayout title="Service Detail">
				<View className="flex-1 items-center justify-center px-4">
					<Text className="text-lg font-semibold text-gray-900 mb-4">Service not found</Text>
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
			<ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
				<View className="bg-gray-200 relative" style={{ height: screenHeight * 0.45 }}>
					{imageUrl ? (
						<Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
					) : (
						<View className="flex-1 items-center justify-center">
							<Ionicons name="image-outline" size={64} color="#9CA3AF" />
						</View>
					)}
					<Pressable
						onPress={() => router.back()}
						className="absolute top-12 left-4 bg-white/80 w-10 h-10 rounded-full items-center justify-center"
					>
						<Ionicons name="arrow-back" size={22} color="#111827" />
					</Pressable>
				</View>

				<View className="-mt-8">
					<View className="bg-white rounded-t-3xl px-5 pt-6 pb-0 border border-gray-100">
						<Text className="text-2xl font-bold text-gray-900 mb-1">{service.title}</Text>
						{(service.rating != null || service.reviews != null) && (
							<View className="flex-row items-center mb-3">
								{service.rating != null && (
									<>
										<Ionicons name="star" size={16} color="#FBBF24" />
										<Text className="text-sm text-gray-600 mx-2">{Number(service.rating).toFixed(1)} Ratings</Text>
									</>
								)}
								{service.reviews != null && (
									<Text className="text-sm text-gray-400">
										{service.rating != null ? ' • ' : ''}
										{Number(service.reviews).toLocaleString()} Reviews
									</Text>
								)}
							</View>
						)}
						<Text className="text-base text-gray-600 mb-4">{service.description}</Text>

						<View className="flex-row items-center mb-4">
							<Ionicons name="briefcase-outline" size={18} color="#6B7280" />
							<Text className="text-sm text-gray-600 ml-2">{service.provider?.name ?? '—'}</Text>
						</View>

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

						<View className="border-t border-gray-100 pt-6">
							<View className="flex-row items-center justify-between mb-4">
								<View>
									<Text className="text-xs text-gray-500">Starting at</Text>
									<Text className="text-xl font-bold text-gray-900">
										{formatPriceAmount(service.price) || service.price}
									</Text>
								</View>
								<View
									className={`px-3 py-1 rounded-full ${
										isCompany ? 'bg-secondary/10' : 'bg-blue-50'
									}`}
								>
									<Text
										className={`text-xs font-semibold ${
											isCompany ? 'text-secondary' : 'text-blue-700'
										}`}
									>
										{providerType}
									</Text>
								</View>
							</View>
							<Pressable className="bg-primary rounded-xl py-4 items-center">
								<Text className="text-white font-semibold text-base">BOOK</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</ScrollView>
		</UserLayout>
	);
}

