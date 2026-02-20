import { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserLayout } from '@/components/layouts/UserLayout';
import { BookingDetailModal } from '@/components/modules/bookings/BookingDetailModal';
import { useCustomerBookings, customerBookingsQueryKey } from '@/hooks/useCustomerBookings';
import type { Booking } from '@/services/customer-bookings.service';
import { BookingStatus, normalizeBookingStatus } from '@/types/booking';
import { formatPriceAmount } from '@/utils/helpers.util';

function formatSchedule(iso: string): string {
	const d = new Date(iso);
	return d.toLocaleDateString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

const STATUS_TABS = [
	{ key: 'ALL' as const, label: 'All' },
	{ key: BookingStatus.PENDING, label: 'Pending' },
	{ key: BookingStatus.COMPLETED, label: 'Completed' },
	{ key: BookingStatus.CANCELLED, label: 'Cancelled' },
] as const;

type StatusFilter = (typeof STATUS_TABS)[number]['key'];

function getStatusStyle(status: string): { bg: string; text: string } {
	const normalized = normalizeBookingStatus(status);
	switch (normalized) {
		case BookingStatus.COMPLETED:
			return { bg: 'bg-green-100', text: 'text-green-700' };
		case BookingStatus.CANCELLED:
			return { bg: 'bg-gray-100', text: 'text-gray-600' };
		case BookingStatus.PENDING:
			return { bg: 'bg-amber-100', text: 'text-amber-700' };
		default:
			return { bg: 'bg-primary/10', text: 'text-primary' };
	}
}

function BookingCard({ booking, onPress }: { booking: Booking; onPress: () => void }) {
	const title = booking.service?.title ?? `Service #${booking.serviceId.slice(0, 8)}`;
	const status = booking.status ?? 'Scheduled';
	const statusStyle = getStatusStyle(status);
	const providerName = booking.provider?.name;
	const amount = booking.payment?.amount ?? booking.service?.price;

	return (
		<Pressable onPress={onPress} className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 active:opacity-90">
			<View className="flex-row items-start justify-between mb-2">
				<Text className="text-base font-semibold text-gray-900 flex-1 mr-2">{title}</Text>
				<View className={`px-2.5 py-1 rounded-full ${statusStyle.bg}`}>
					<Text className={`text-xs font-semibold ${statusStyle.text}`}>{status}</Text>
				</View>
			</View>
			{providerName ? (
				<View className="flex-row items-center mt-1">
					<Ionicons name="person-outline" size={14} color="#6B7280" />
					<Text className="text-sm text-gray-600 ml-2">{providerName}</Text>
				</View>
			) : null}
			<View className="flex-row items-center mt-1">
				<Ionicons name="calendar-outline" size={14} color="#6B7280" />
				<Text className="text-sm text-gray-600 ml-2">{formatSchedule(booking.schedule)}</Text>
			</View>
			{booking.address ? (
				<View className="flex-row items-center mt-1">
					<Ionicons name="location-outline" size={14} color="#6B7280" />
					<Text className="text-sm text-gray-600 ml-2 flex-1" numberOfLines={2}>
						{booking.address}
					</Text>
				</View>
			) : null}
			{amount != null && (
				<View className="flex-row items-center mt-2 pt-2 border-t border-gray-100">
					<Text className="text-xs text-gray-500">Amount</Text>
					<Text className="text-sm font-semibold text-gray-900 ml-2">{formatPriceAmount(amount)}</Text>
					{booking.payment?.status ? (
						<View className="ml-2 px-2 py-0.5 rounded bg-gray-100">
							<Text className="text-xs text-gray-600">{booking.payment.status}</Text>
						</View>
					) : null}
				</View>
			)}
		</Pressable>
	);
}

export default function BookingsTab() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
	const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
	const { data: bookings = [], isLoading, isError, refetch } = useCustomerBookings();

	const handleCancelBooking = useCallback(
		(_booking: Booking) => {
			// TODO: call cancel booking API (e.g. PATCH /customer/bookings/:id/cancel)
			queryClient.invalidateQueries({ queryKey: customerBookingsQueryKey });
			setSelectedBooking(null);
		},
		[queryClient]
	);

	const filteredBookings = useMemo(() => {
		if (statusFilter === 'ALL') return bookings;
		return bookings.filter((b) => normalizeBookingStatus(b.status) === statusFilter);
	}, [bookings, statusFilter]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, [refetch]);

	return (
		<UserLayout showHeader={false} showFooter={false}>
			<View className="flex-1 bg-gray-50">
				<View className="bg-white border-b border-gray-100 px-4 pt-4" style={{ paddingBottom: 12 }}>
					<Text className="text-lg text-center font-semibold text-gray-900">My Bookings</Text>
				</View>

				<View className="p-4">
					<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
						{STATUS_TABS.map((tab) => {
							const isActive = statusFilter === tab.key;
							return (
								<Pressable
									key={tab.key}
									onPress={() => setStatusFilter(tab.key)}
									className={`px-4 py-2 rounded-full mr-2 ${isActive ? 'bg-primary' : 'bg-gray-100'}`}
								>
									<Text className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
										{tab.label}
									</Text>
								</Pressable>
							);
						})}
					</ScrollView>
				</View>

				<ScrollView
					className="flex-1 px-4"
					contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7a0f1d" />}
				>
					{isLoading && bookings.length === 0 ? (
						<View className="flex-1 py-16 items-center justify-center">
							<ActivityIndicator size="large" color="#7a0f1d" />
							<Text className="text-gray-500 mt-3">Loading your bookings...</Text>
						</View>
					) : isError ? (
						<View className="py-16 items-center">
							<Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
							<Text className="text-gray-600 text-center mt-3">Unable to load bookings</Text>
							<Pressable onPress={() => refetch()} className="mt-4 px-6 py-3 bg-primary rounded-xl">
								<Text className="text-white font-semibold">Retry</Text>
							</Pressable>
						</View>
					) : bookings.length === 0 ? (
						<View className="py-16 items-center">
							<Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
							<Text className="text-lg font-medium text-gray-500 mt-4">No bookings yet</Text>
							<Text className="text-sm text-gray-400 text-center mt-1">Book a service to see it here</Text>
							<Pressable
								onPress={() => router.replace('/user/customer')}
								className="mt-6 px-6 py-3 bg-primary rounded-xl"
							>
								<Text className="text-white font-semibold">Browse services</Text>
							</Pressable>
						</View>
					) : filteredBookings.length === 0 ? (
						<View className="py-16 items-center">
							<Ionicons name="filter-outline" size={64} color="#D1D5DB" />
							<Text className="text-lg font-medium text-gray-500 mt-4">No {statusFilter.toLowerCase()} bookings</Text>
							<Text className="text-sm text-gray-400 text-center mt-1">Try another tab</Text>
						</View>
					) : (
						<View>
							<Text className="text-sm text-gray-500 mb-3">
								{filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
							</Text>
							{filteredBookings.map((booking) => (
								<BookingCard key={booking.id} booking={booking} onPress={() => setSelectedBooking(booking)} />
							))}
						</View>
					)}
				</ScrollView>
			</View>
			<BookingDetailModal
				visible={selectedBooking != null}
				booking={selectedBooking}
				onClose={() => setSelectedBooking(null)}
				onCancel={handleCancelBooking}
			/>
		</UserLayout>
	);
}
