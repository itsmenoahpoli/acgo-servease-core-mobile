/** Category ref embedded in a service response */
export interface ServiceCategoryRef {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

/** Provider ref embedded in a service response */
export interface ServiceProviderRef {
	id: string;
	email?: string;
	userUid?: string;
	name: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	address?: string;
	password?: string;
	accountType?: string;
	accountStatus?: string;
	roleId?: string;
	createdAt?: string;
	updatedAt?: string;
	rating?: number;
}

export interface ServiceImage {
	alt?: string;
	url: string;
	order?: number;
	caption?: string;
}

/** Service as returned from /api/v1/customer/services */
export interface Service {
	id: string;
	title: string;
	categoryId: string;
	category: ServiceCategoryRef;
	providerId: string;
	provider: ServiceProviderRef;
	price: string;
	description: string;
	experienceLevel?: string;
	bannerUrl?: string;
	images?: ServiceImage[];
	isActive?: boolean;
	isFeatured?: boolean;
	createdAt?: string;
	updatedAt?: string;
	/** Optional fields that may be returned or used by the app */
	rating?: number;
	reviews?: number;
	serviceIncludes?: string[];
	about?: string;
}

/** Used for categories list (e.g. /customer/services/categories) */
export interface ServiceCategory {
	id: string;
	name: string;
	icon?: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export type ProviderType = 'Business' | 'Freelancer';

/** Derive display provider type from provider.accountType */
export function getServiceProviderType(service: Service): ProviderType | string {
	const type = service.provider?.accountType ?? '';
	if (type.includes('business')) return 'Business';
	if (type.includes('independent')) return 'Freelancer';
	return type || 'Provider';
}

/** Display label for a provider's accountType (used in provider list) */
export function getProviderTypeLabel(provider: ServiceProviderRef): ProviderType | string {
	const type = provider?.accountType ?? '';
	if (type.includes('business')) return 'Business';
	if (type.includes('independent')) return 'Freelancer';
	return type || 'Provider';
}

/** First image URL for a service (banner or first in images array) */
export function getServiceImageUrl(service: Service): string | undefined {
	return service.bannerUrl ?? service.images?.[0]?.url;
}
