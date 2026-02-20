import { useState } from 'react';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { BRAND_LOGO, GOOGLE_LOGO, FACEBOOK_LOGO } from '@/assets';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { authSigninService } from '@/services/auth-signin.service';

export default function SignIn() {
	const router = useRouter();
	const [email, setEmail] = useState('customer@servease.com');
	const [password, setPassword] = useState('Test123!@#');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSignIn = async () => {
		const trimmedEmail = email.trim();
		if (!trimmedEmail || !password) {
			setError('Please enter email and password');
			return;
		}
		setError(null);
		setIsSubmitting(true);
		try {
			await authSigninService.signin({ email: trimmedEmail, password });
			router.push({
				pathname: '/auth/verify-otp',
				params: { method: 'email', identifier: trimmedEmail, flow: 'login' },
			});
		} catch (err) {
			setError((err as Error).message ?? 'Sign in failed');
		} finally {
			setIsSubmitting(false);
		}
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

				<View className="gap-3 mb-6">
					<View>
						<Text className="text-white text-sm mb-2 font-medium">Email</Text>
						<TextInput
							value={email}
							onChangeText={setEmail}
							placeholder="yourname@domain.com"
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
							className="bg-white rounded-lg px-4 pb-3 text-base text-black h-14"
						/>
					</View>

					<View>
						<View className="flex-row items-center justify-between mb-2">
							<Text className="text-white text-sm font-medium">Password</Text>
							<Pressable onPress={() => router.push('/auth/request-otp')}>
								<Text className="text-zinc-200 text-sm font-medium">Forgot password?</Text>
							</Pressable>
						</View>
						<View className="relative">
							<TextInput
								value={password}
								onChangeText={setPassword}
								placeholder="********"
								secureTextEntry={!showPassword}
								autoCapitalize="none"
								autoComplete="password"
								className="bg-white rounded-lg px-4 pb-3 text-black text-base h-14 pr-16"
							/>
							<Pressable
								onPress={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-0 bottom-0 justify-center"
							>
								<Text className="text-white/80 text-sm font-medium">{showPassword ? 'Hide' : 'Show'}</Text>
							</Pressable>
						</View>
					</View>

					{error ? (
						<View className="mb-3 rounded-lg bg-red-500/20 border border-red-400 px-3 py-2">
							<Text className="text-red-200 text-sm">{error}</Text>
						</View>
					) : null}

					<Pressable
						onPress={handleSignIn}
						disabled={isSubmitting}
						className={`rounded-lg items-center justify-center h-14 ${isSubmitting ? 'bg-primary/60' : 'bg-primary'}`}
					>
						{isSubmitting ? (
							<ActivityIndicator color="white" />
						) : (
							<Text className="text-white text-lg font-bold">Sign In</Text>
						)}
					</Pressable>

					<View className="flex-row items-center my-2">
						<View className="flex-1 h-px bg-white/30" />
						<Text className="text-white/70 text-sm mx-4">OR</Text>
						<View className="flex-1 h-px bg-white/30" />
					</View>

					<Pressable
						onPress={() => router.push('/auth/request-otp')}
						className="bg-white rounded-lg items-center justify-center h-12 flex-row"
					>
						<Text className="text-gray-800 text-base font-semibold">Continue via SMS</Text>
					</Pressable>

					<Pressable className="bg-white rounded-lg items-center justify-center h-12 flex-row">
						<Image source={GOOGLE_LOGO} resizeMode="contain" className="w-6 h-6 mr-3" />
						<Text className="text-gray-800 text-base font-semibold">Continue with Google</Text>
					</Pressable>

					<Pressable className="bg-[#1877F2] rounded-lg items-center justify-center h-12 flex-row">
						<Image source={FACEBOOK_LOGO} resizeMode="contain" className="w-6 h-6 mr-3" />
						<Text className="text-white text-base font-semibold">Continue with Facebook</Text>
					</Pressable>
				</View>

				<View className="flex-row items-center justify-center mt-6">
					<Text className="text-white/80 text-base">{"Don't have an account? "}</Text>
					<Pressable onPress={() => router.push('/auth/signup')}>
						<Text className="text-white text-sm font-semibold">Sign Up</Text>
					</Pressable>
				</View>
			</View>
		</AuthLayout>
	);
}
