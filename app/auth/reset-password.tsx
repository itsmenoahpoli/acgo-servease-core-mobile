import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { BRAND_LOGO } from '@/assets';
import { AuthLayout } from '@/components/layouts/AuthLayout';

interface ResetPasswordFormData {
	password: string;
	confirmPassword: string;
}

export default function ResetPassword() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ResetPasswordFormData>({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const password = watch('password');

	const onSubmit = (data: ResetPasswordFormData) => {
		console.log('Reset password:', data);
		router.push('/auth/signin');
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
					<Text className="text-2xl text-white font-bold mb-2">Reset Password</Text>
					<Text className="text-base text-white/80">Enter your new desired password</Text>
				</View>

				<View className="mb-4">
					<Text className="text-white text-sm mb-2 font-medium">New Password</Text>
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
									placeholder="********"
									secureTextEntry={!showPassword}
									autoCapitalize="none"
									autoComplete="password-new"
									className={`bg-white rounded-lg px-4 py-3 text-base h-14 ${
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
							<Text className="text-white/80 text-sm font-medium">{showPassword ? 'Hide' : 'Show'}</Text>
						</Pressable>
					</View>
					{errors.password && <Text className="text-red-400 text-xs mt-1">{errors.password.message}</Text>}
				</View>

				<View className="mb-6">
					<Text className="text-white text-sm mb-2 font-medium">Confirm Password</Text>
					<View className="relative">
						<Controller
							control={control}
							rules={{
								required: 'Please confirm your password',
								validate: (value) => value === password || 'Passwords do not match',
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									placeholder="********"
									secureTextEntry={!showConfirmPassword}
									autoCapitalize="none"
									autoComplete="password-new"
									className={`bg-white rounded-lg px-4 py-3 text-base h-14 ${
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
							<Text className="text-white/80 text-sm font-medium">{showConfirmPassword ? 'Hide' : 'Show'}</Text>
						</Pressable>
					</View>
					{errors.confirmPassword && (
						<Text className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</Text>
					)}
				</View>

				<Pressable
					onPress={handleSubmit(onSubmit)}
					className="bg-primary rounded-lg items-center justify-center h-14 mb-6"
				>
					<Text className="text-white text-lg font-bold">Reset Password</Text>
				</Pressable>

				<View className="flex-row items-center justify-center mt-6">
					<Text className="text-white/80 text-base">Remember your password? </Text>
					<Pressable onPress={() => router.push('/auth/signin')}>
						<Text className="text-white text-base font-semibold">Sign In</Text>
					</Pressable>
				</View>
			</View>
		</AuthLayout>
	);
}
