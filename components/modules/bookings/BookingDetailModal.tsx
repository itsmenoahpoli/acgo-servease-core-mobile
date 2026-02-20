import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { Booking } from '@/services/customer-bookings.service';
import { BookingStatus, normalizeBookingStatus } from '@/types/booking';
import { formatPriceAmount } from '@/utils/helpers.util';

function formatSchedule(iso: string): string {
	const d = new Date(iso);
	return d.toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

function formatDate(iso: string): string {
	const d = new Date(iso);
	return d.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

function DetailRow({
	icon,
	label,
	value,
}: {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	value: string | null | undefined;
}) {
	if (value == null || value === '') return null;
	return (
		<View className="flex-row items-start mb-3">
			<View className="w-8 items-center pt-0.5">
				<Ionicons name={icon} size={18} color="#6B7280" />
			</View>
			<View className="flex-1 ml-2">
				<Text className="text-xs text-gray-500 uppercase mb-0.5">{label}</Text>
				<Text className="text-base text-gray-900">{value}</Text>
			</View>
		</View>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<View className="mb-6">
			<Text className="text-xs font-semibold text-gray-500 uppercase mb-3">{title}</Text>
			{children}
		</View>
	);
}

export interface BookingDetailModalProps {
	visible: boolean;
	booking: Booking | null;
	onClose: () => void;
	onCancel?: (booking: Booking) => void;
}

export function BookingDetailModal({ visible, booking, onClose, onCancel }: BookingDetailModalProps) {
	const insets = useSafeAreaInsets();

	if (!booking) return null;

	const status = booking.status ?? '—';
	const normalizedStatus = normalizeBookingStatus(booking.status);
	const isPending = normalizedStatus === BookingStatus.PENDING;
	const statusColor =
		normalizedStatus === BookingStatus.COMPLETED
			? 'text-green-700'
			: normalizedStatus === BookingStatus.CANCELLED
				? 'text-gray-600'
				: normalizedStatus === BookingStatus.PENDING
					? 'text-amber-700'
					: 'text-primary';

	return (
		<>
			{visible && <StatusBar style="dark" />}
			<Modal visible={visible} animationType="slide" statusBarTranslucent>
				<View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
					<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
						<View className="w-8" />
						<Text className="flex-1 text-lg font-semibold text-gray-900 text-center">Booking details</Text>
						<Pressable onPress={onClose} className="w-8 h-8 items-center justify-center">
							<Ionicons name="close" size={24} color="#374151" />
						</Pressable>
					</View>

					<ScrollView
						className="flex-1"
						contentContainerStyle={{
							padding: 16,
							paddingBottom: isPending ? insets.bottom + 24 + 60 + 16 : insets.bottom + 24,
						}}
						showsVerticalScrollIndicator={false}
					>
						<View className="mb-6">
							<View className="flex-row items-center justify-between mb-2">
								<Text className="text-lg font-semibold text-gray-900 flex-1 mr-2">
									{booking.service?.title ?? `Service #${booking.serviceId.slice(0, 8)}`}
								</Text>
								<View className="px-3 py-1.5 rounded-full bg-primary/10">
									<Text className={`text-sm font-semibold ${statusColor}`}>{status}</Text>
								</View>
							</View>
							{booking.service?.description ? (
								<Text className="text-sm text-gray-600 mb-2">{booking.service.description}</Text>
							) : null}
							{booking.service?.price != null && (
								<Text className="text-base font-semibold text-gray-900">
									{formatPriceAmount(booking.service.price)}
								</Text>
							)}
						</View>

						<Section title="Schedule & location">
							<DetailRow icon="calendar-outline" label="Date & time" value={formatSchedule(booking.schedule)} />
							<DetailRow icon="location-outline" label="Service address" value={booking.address} />
						</Section>

						<Section title="Provider">
							<DetailRow icon="person-outline" label="Name" value={booking.provider?.name as string | undefined} />
							<DetailRow icon="call-outline" label="Phone" value={(booking.provider as { phoneNumber?: string })?.phoneNumber} />
							<DetailRow icon="location-outline" label="Address" value={(booking.provider as { address?: string })?.address} />
						</Section>

						{booking.payment ? (
							<Section title="Payment">
								<DetailRow
									icon="card-outline"
									label="Amount"
									value={formatPriceAmount(booking.payment.amount) || `${booking.payment.currency} ${booking.payment.amount}`}
								/>
								<DetailRow icon="information-circle-outline" label="Status" value={booking.payment.status} />
								{booking.payment.transactionId ? (
									<DetailRow icon="receipt-outline" label="Transaction ID" value={booking.payment.transactionId} />
								) : null}
							</Section>
						) : null}

						{(booking.createdAt || booking.updatedAt) && (
							<Section title="Record">
								{booking.createdAt && (
									<DetailRow icon="time-outline" label="Booked on" value={formatDate(booking.createdAt)} />
								)}
								{booking.updatedAt && booking.updatedAt !== booking.createdAt && (
									<DetailRow icon="time-outline" label="Last updated" value={formatDate(booking.updatedAt)} />
								)}
							</Section>
						)}
					</ScrollView>

					{isPending ? (
						<View
							className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pt-4"
							style={{ paddingBottom: insets.bottom + 16 }}
						>
							<Text className="text-xs text-gray-400 mb-3 text-center">
								* Can only be cancelled if status is pending
							</Text>
							<Pressable
								onPress={() => onCancel?.(booking)}
								className="py-3.5 rounded-xl items-center bg-red-500 active:opacity-90"
							>
								<Text className="text-white font-semibold text-base">Cancel booking</Text>
							</Pressable>
						</View>
					) : null}
				</View>
			</Modal>
		</>
	);
}
