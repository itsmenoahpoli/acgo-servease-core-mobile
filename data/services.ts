import { Service, ServiceCategory } from '@/types/service';

export const serviceCategories: ServiceCategory[] = [
	{ id: '1', name: 'Water', icon: 'water-outline' },
	{ id: '2', name: 'Electrical', icon: 'flash-outline' },
	{ id: '3', name: 'Home Repair', icon: 'hammer-outline' },
	{ id: '4', name: 'Lawn Care', icon: 'leaf-outline' },
	{ id: '5', name: 'Plumbing', icon: 'construct-outline' },
	{ id: '6', name: 'Cleaning', icon: 'sparkles-outline' },
	{ id: '7', name: 'HVAC', icon: 'snow-outline' },
	{ id: '8', name: 'Painting', icon: 'color-palette-outline' },
];

export const popularServices: Service[] = [
	{
		id: '1',
		title: 'Water Service Installation',
		description: 'Professional water system installation and repair',
		category: 'Water',
		provider: 'Aqua Solutions',
		providerType: 'Company Provider',
		rating: 4.8,
		reviews: 2100,
		price: '₱150/hr',
		serviceIncludes: ['Pump Setup', 'Quality Testing', 'Maintenance'],
		about:
			'Full water system installations with quality assurance and post-installation support from accredited technicians.',
	},
	{
		id: '2',
		title: 'Electrical Wiring Service',
		description: 'Expert electrical installation and maintenance',
		category: 'Electrical',
		provider: 'PowerTech Electric',
		providerType: 'Company Provider',
		rating: 4.9,
		reviews: 3200,
		price: '₱120/hr',
		serviceIncludes: ['Diagnostics', 'Safety Checks', 'Full Wiring'],
		about:
			'Certified electricians specializing in residential and commercial electrical wiring, safety audits, and upgrades.',
	},
	{
		id: '3',
		title: 'Home Repair Specialist',
		description: 'Complete home repair and maintenance solutions',
		category: 'Home Repair',
		provider: 'FixIt Pro',
		providerType: 'Independent Provider',
		rating: 4.7,
		reviews: 1900,
		price: '₱100/hr',
		serviceIncludes: ['Minor Repairs', 'Fixture Replacement', 'Consultation'],
		about:
			'On-demand repair expert handling carpentry, fixture replacements, and household maintenance with quick turnaround.',
	},
	{
		id: '4',
		title: 'Lawn Mowing Service',
		description: 'Professional lawn care and landscaping',
		category: 'Lawn Care',
		provider: 'GreenThumb Services',
		providerType: 'Independent Provider',
		rating: 4.6,
		reviews: 1200,
		price: '₱80/hr',
		serviceIncludes: ['Mowing', 'Edging', 'Cleanup'],
		about: 'Comprehensive lawn maintenance, landscaping touch-ups, and scheduled garden care plans.',
	},
	{
		id: '5',
		title: 'Plumbing Repair',
		description: '24/7 emergency plumbing services',
		category: 'Plumbing',
		provider: 'Pipe Masters',
		providerType: 'Company Provider',
		rating: 4.9,
		reviews: 2500,
		price: '₱130/hr',
		serviceIncludes: ['Leak Fix', 'Pipe Replacement', 'Inspection'],
		about: 'Rapid-response plumbing team for emergencies, leak repairs, and preventive inspections across Metro Manila.',
	},
];

