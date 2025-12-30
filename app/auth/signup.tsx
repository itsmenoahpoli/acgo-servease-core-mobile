import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { BRAND_LOGO } from '@/assets';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { formatPhoneNumber } from '@/utils/helpers.util';

interface SignUpFormData {
	name: string;
	email: string;
	contactNumber: string;
	password: string;
	confirmPassword: string;
	acceptTerms: boolean;
}

export default function SignUp() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpFormData>({
		defaultValues: {
			name: '',
			email: '',
			contactNumber: '',
			password: '',
			confirmPassword: '',
			acceptTerms: false,
		},
	});

	const password = watch('password');

	const handlePhoneChange = (onChange: (value: string) => void, value: string) => {
		const formatted = formatPhoneNumber(value);
		onChange(formatted);
	};

	const onSubmit = (data: SignUpFormData) => {
		console.log(data);
	};

	return (
		<AuthLayout>
			<View className="flex-1 justify-center py-8">
				<View className="items-center mb-8">
					<Image
						source={BRAND_LOGO}
						resizeMethod="resize"
						resizeMode="contain"
						className="h-24 w-24 mb-4 rounded-2xl"
					/>
					<Text className="text-2xl text-white font-bold mb-2">Create Account</Text>
					<Text className="text-base text-white/80">Sign up to get started</Text>
				</View>

				<View className="mb-4">
					<Text className="text-white text-sm mb-2 font-medium">Full Name</Text>
					<Controller
						control={control}
						rules={{
							required: 'Full name is required',
							minLength: {
								value: 2,
								message: 'Name must be at least 2 characters',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="Enter your full name"
								placeholderTextColor="rgba(255, 255, 255, 0.5)"
								autoCapitalize="words"
								autoComplete="name"
								className={`bg-white/25 border rounded-lg px-4 py-3 text-white text-base ${
									errors.name ? 'border-red-500' : 'border-white/40'
								}`}
							/>
						)}
						name="name"
					/>
					{errors.name && (
						<Text className="text-red-400 text-xs mt-1">{errors.name.message}</Text>
					)}
				</View>

				<View className="mb-4">
					<Text className="text-white text-sm mb-2 font-medium">Email</Text>
					<Controller
						control={control}
						rules={{
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="Enter your email"
								placeholderTextColor="rgba(255, 255, 255, 0.5)"
								keyboardType="email-address"
								autoCapitalize="none"
								autoComplete="email"
								className={`bg-white/25 border rounded-lg px-4 py-3 text-white text-base ${
									errors.email ? 'border-red-500' : 'border-white/40'
								}`}
							/>
						)}
						name="email"
					/>
					{errors.email && (
						<Text className="text-red-400 text-xs mt-1">{errors.email.message}</Text>
					)}
				</View>

				<View className="mb-4">
					<Text className="text-white text-sm mb-2 font-medium">Contact Number</Text>
					<Controller
						control={control}
						rules={{
							required: 'Contact number is required',
							pattern: {
								value: /^\+639\d{9}$/,
								message: 'Invalid phone number. Format: +639XXXXXXXXX',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								value={value}
								onChangeText={(text) => handlePhoneChange(onChange, text)}
								onBlur={onBlur}
								placeholder="+639XXXXXXXXX"
								placeholderTextColor="rgba(255, 255, 255, 0.5)"
								keyboardType="phone-pad"
								autoCapitalize="none"
								autoComplete="tel"
								maxLength={13}
								className={`bg-white/25 border rounded-lg px-4 py-3 text-white text-base ${
									errors.contactNumber ? 'border-red-500' : 'border-white/40'
								}`}
							/>
						)}
						name="contactNumber"
					/>
					{errors.contactNumber && (
						<Text className="text-red-400 text-xs mt-1">
							{errors.contactNumber.message}
						</Text>
					)}
				</View>

				<View className="mb-4">
					<Text className="text-white text-sm mb-2 font-medium">Password</Text>
					<View className="relative">
						<Controller
							control={control}
							rules={{
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be at least 6 characters',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									placeholder="Enter your password"
									placeholderTextColor="rgba(255, 255, 255, 0.5)"
									secureTextEntry={!showPassword}
									autoCapitalize="none"
									autoComplete="password-new"
									className={`bg-white/25 border rounded-lg px-4 py-3 text-white text-base pr-12 ${
										errors.password ? 'border-red-500' : 'border-white/40'
									}`}
								/>
							)}
							name="password"
						/>
						<Pressable
							onPress={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-0 bottom-0 justify-center"
						>
							<Text className="text-white/80 text-sm font-medium">
								{showPassword ? 'Hide' : 'Show'}
							</Text>
						</Pressable>
					</View>
					{errors.password && (
						<Text className="text-red-400 text-xs mt-1">{errors.password.message}</Text>
					)}
				</View>

				<View className="mb-4">
					<Text className="text-white text-sm mb-2 font-medium">Confirm Password</Text>
					<View className="relative">
						<Controller
							control={control}
							rules={{
								required: 'Please confirm your password',
								validate: (value) =>
									value === password || 'Passwords do not match',
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									placeholder="Confirm your password"
									placeholderTextColor="rgba(255, 255, 255, 0.5)"
									secureTextEntry={!showConfirmPassword}
									autoCapitalize="none"
									autoComplete="password-new"
									className={`bg-white/25 border rounded-lg px-4 py-3 text-white text-base pr-12 ${
										errors.confirmPassword ? 'border-red-500' : 'border-white/40'
									}`}
								/>
							)}
							name="confirmPassword"
						/>
						<Pressable
							onPress={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-0 bottom-0 justify-center"
						>
							<Text className="text-white/80 text-sm font-medium">
								{showConfirmPassword ? 'Hide' : 'Show'}
							</Text>
						</Pressable>
					</View>
					{errors.confirmPassword && (
						<Text className="text-red-400 text-xs mt-1">
							{errors.confirmPassword.message}
						</Text>
					)}
				</View>

				<View className="mb-6">
					<Controller
						control={control}
						rules={{
							required: 'You must accept the terms and conditions',
						}}
						render={({ field: { onChange, value } }) => (
							<Pressable
								onPress={() => onChange(!value)}
								className="flex-row items-start"
							>
								<View
									className={`w-5 h-5 border-2 rounded mr-2 items-center justify-center mt-0.5 ${
										value
											? 'bg-primary border-primary'
											: errors.acceptTerms
												? 'border-red-500'
												: 'border-white/50'
									}`}
								>
									{value && <Text className="text-white text-xs font-bold">✓</Text>}
								</View>
								<View className="flex-1 flex-row flex-wrap">
									<Text className="text-white text-sm">I agree to the </Text>
									<Pressable onPress={() => router.push('/system/terms-conditions')}>
										<Text className="text-white text-sm font-semibold underline">
											Terms & Conditions
										</Text>
									</Pressable>
									<Text className="text-white text-sm"> and </Text>
									<Pressable onPress={() => router.push('/system/privacy-policy')}>
										<Text className="text-white text-sm font-semibold underline">
											Privacy Policy
										</Text>
									</Pressable>
								</View>
							</Pressable>
						)}
						name="acceptTerms"
					/>
					{errors.acceptTerms && (
						<Text className="text-red-400 text-xs mt-1">
							{errors.acceptTerms.message}
						</Text>
					)}
				</View>

				<Pressable
					onPress={handleSubmit(onSubmit)}
					className="bg-primary rounded-lg items-center justify-center h-14 mb-6"
				>
					<Text className="text-white text-lg font-bold">Create Account</Text>
				</Pressable>

				<View className="flex-row items-center justify-center mt-6">
					<Text className="text-white/80 text-sm">Already have an account? </Text>
					<Pressable onPress={() => router.push('/auth/signin')}>
						<Text className="text-white text-sm font-semibold">Sign In</Text>
					</Pressable>
				</View>
			</View>
		</AuthLayout>
	);
}

