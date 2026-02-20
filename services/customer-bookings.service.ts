import { httpClient } from './httpClient';
import type { BookingStatusValue } from '@/types/booking';

const CUSTOMER_BOOKINGS_PATH = '/customer/bookings';

export interface CreateBookingPayload {
	serviceId: string;
	schedule: string;
	address: string;
}

export interface BookingServiceRef {
	id: string;
	title: string;
	categoryId?: string;
	providerId?: string;
	price: string;
	description?: string;
	bannerUrl?: string;
	images?: { alt?: string; url: string; order?: number; caption?: string }[];
	[key: string]: unknown;
}

export interface BookingPaymentRef {
	id: string;
	bookingId: string;
	amount: string;
	currency: string;
	status: string;
	paymentIntentId?: string | null;
	transactionId?: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface Booking {
	id: string;
	serviceId: string;
	service?: BookingServiceRef;
	customerId?: string;
	customer?: { id: string; name?: string; email?: string; [key: string]: unknown };
	providerId?: string;
	provider?: { id: string; name?: string; [key: string]: unknown };
	schedule: string;
	address: string;
	status: BookingStatusValue | string;
	payment?: BookingPaymentRef;
	createdAt?: string;
	updatedAt?: string;
}

export const customerBookingsService = {
	async createBooking(payload: CreateBookingPayload): Promise<Booking> {
		const { data } = await httpClient.post<Booking>(CUSTOMER_BOOKINGS_PATH, payload);
		return data;
	},

	async fetchAll(): Promise<Booking[]> {
		const { data } = await httpClient.get<Booking[]>(CUSTOMER_BOOKINGS_PATH);
		return data;
	},
};
