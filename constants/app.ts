export const BUILD_VERSION =
	typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_BUILD_VERSION
		? process.env.EXPO_PUBLIC_BUILD_VERSION
		: '1.0.0';
