import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { BRAND_LOGO } from '@/assets';
import { AuthLayout } from '@/components/layouts/AuthLayout';

interface SignInFormData {
	email: string;
	password: string;
	rememberMe: boolean;
}

export default function SignIn() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	const onSubmit = (data: SignInFormData) => {
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
					<Text className="text-2xl text-white font-bold mb-2">Welcome Back</Text>
					<Text className="text-base text-white/80">Sign in to continue</Text>
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
									autoComplete="password"
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

				<View className="flex-row items-center justify-between mb-6">
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<Pressable
								onPress={() => onChange(!value)}
								className="flex-row items-center"
							>
								<View
									className={`w-5 h-5 border-2 border-white/50 rounded mr-2 items-center justify-center ${
										value ? 'bg-primary border-primary' : ''
									}`}
								>
									{value && <Text className="text-white text-xs font-bold">✓</Text>}
								</View>
								<Text className="text-white text-sm">Remember me</Text>
							</Pressable>
						)}
						name="rememberMe"
					/>

					<Pressable onPress={() => router.push('/auth/request-otp')}>
						<Text className="text-white text-sm font-medium">Forgot password?</Text>
					</Pressable>
				</View>

				<Pressable
					onPress={handleSubmit(onSubmit)}
					className="bg-primary rounded-lg items-center justify-center h-14 mb-6"
				>
					<Text className="text-white text-lg font-bold">Sign In</Text>
				</Pressable>

				<View className="flex-row items-center mb-6">
					<View className="flex-1 h-px bg-white/30" />
					<Text className="text-white/70 text-sm mx-4">OR</Text>
					<View className="flex-1 h-px bg-white/30" />
				</View>

				<View className="gap-3">
					<Pressable className="bg-white rounded-lg items-center justify-center h-14 flex-row">
						<View className="w-6 h-6 mr-3 items-center justify-center">
							<Text className="text-2xl">G</Text>
						</View>
						<Text className="text-gray-800 text-base font-semibold">
							Continue with Google
						</Text>
					</Pressable>

					<Pressable className="bg-[#1877F2] rounded-lg items-center justify-center h-14 flex-row">
						<View className="w-6 h-6 mr-3 items-center justify-center">
							<Text className="text-white text-xl font-bold">f</Text>
						</View>
						<Text className="text-white text-base font-semibold">
							Continue with Facebook
						</Text>
					</Pressable>
				</View>

				<View className="flex-row items-center justify-center mt-6">
					<Text className="text-white/80 text-sm">Don't have an account? </Text>
					<Pressable onPress={() => router.push('/auth/signup')}>
						<Text className="text-white text-sm font-semibold">Sign Up</Text>
					</Pressable>
				</View>
			</View>
		</AuthLayout>
	);
}
