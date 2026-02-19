import { Platform } from 'react-native';

export const isIOS = () => Platform.OS === 'ios';
export const isAndroid = () => Platform.OS === 'android';

/**
 * Formats a price amount with thousands separators (commas) and decimal places.
 * @param value - Number or numeric string (e.g. 1234.5, "1234.5", "₱1,234.56")
 * @param decimalPlaces - Number of decimal places (default 2)
 * @returns Formatted string (e.g. "1,234.50") or empty string if invalid
 */
export const formatPriceAmount = (value: number | string | null | undefined, decimalPlaces = 2): string => {
	if (value === null || value === undefined || value === '') return '';
	const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : Number(value);
	if (Number.isNaN(num)) return '';
	return num.toLocaleString('en-US', {
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces,
	});
};

export const formatPhoneNumber = (value: string) => {
	if (!value) return '';

	const cleaned = value.replace(/\D/g, '');

	if (cleaned.startsWith('639')) {
		return `+${cleaned.substring(0, 12)}`;
	}
	if (cleaned.startsWith('63') && cleaned.length > 2) {
		const digits = cleaned.substring(2, 12);
		return `+639${digits}`;
	}
	if (cleaned.startsWith('9')) {
		return `+63${cleaned.substring(0, 10)}`;
	}
	if (cleaned.startsWith('0')) {
		return `+63${cleaned.substring(1, 11)}`;
	}
	if (cleaned.length > 0) {
		return `+639${cleaned.substring(0, 9)}`;
	}
	return '';
};

