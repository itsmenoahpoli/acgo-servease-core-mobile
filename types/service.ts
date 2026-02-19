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
	name: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNumber?: string;
	address?: string;
	accountType?: string;
	accountStatus?: string;
	roleId?: string;
	createdAt?: string;
	updatedAt?: string;
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
	description: string;
	categoryId: string;
	category: ServiceCategoryRef;
	providerId: string;
	provider: ServiceProviderRef;
	price: string;
	experienceLevel?: string;
	bannerUrl?: string;
	images?: ServiceImage[];
	isActive?: boolean;
	isFeatured?: boolean;
	createdAt?: string;
	updatedAt?: string;
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

export type ProviderType = 'Company Provider' | 'Independent Provider';

/** Derive display provider type from provider.accountType */
export function getServiceProviderType(service: Service): ProviderType | string {
	const type = service.provider?.accountType ?? '';
	if (type.includes('business')) return 'Company Provider';
	if (type.includes('independent')) return 'Independent Provider';
	return type || 'Provider';
}

/** First image URL for a service (banner or first in images array) */
export function getServiceImageUrl(service: Service): string | undefined {
	return service.bannerUrl ?? service.images?.[0]?.url;
}
