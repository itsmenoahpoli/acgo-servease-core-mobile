export type ProviderType = 'Independent Provider' | 'Company Provider';

export interface ServiceCategory {
	id: string;
	name: string;
	icon: string;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	category: string;
	provider: string;
	providerType: ProviderType;
	rating: number;
	reviews: number;
	price: string;
	image?: string;
	serviceIncludes: string[];
	about: string;
}

