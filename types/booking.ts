/**
 * Reusable booking status values. Use these instead of string literals.
 */
export const BookingStatus = {
	PENDING: 'PENDING',
	COMPLETED: 'COMPLETED',
	CANCELLED: 'CANCELLED',
} as const;

export type BookingStatusValue = (typeof BookingStatus)[keyof typeof BookingStatus];

/** Normalize API status string to BookingStatusValue for comparison */
export function normalizeBookingStatus(status: string | undefined | null): BookingStatusValue | string {
	const upper = (status ?? '').toUpperCase();
	if (upper === BookingStatus.PENDING || upper === BookingStatus.COMPLETED || upper === BookingStatus.CANCELLED) {
		return upper;
	}
	return status ?? '';
}
