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

