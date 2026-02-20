import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BRAND_LOGO } from '@/assets';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { authSigninService } from '@/services/auth-signin.service';
import { authTokenStorage } from '@/services/auth-token-storage';

export default function VerifyOTP() {
	const router = useRouter();
	const params = useLocalSearchParams<{ method?: string; identifier?: string; flow?: string }>();
	const method = (params.method as 'email' | 'sms') || 'email';
	const identifier = Array.isArray(params.identifier) ? params.identifier[0] : (params.identifier ?? '');
	const flow = Array.isArray(params.flow) ? params.flow[0] : params.flow;
	const isLoginFlow = flow === 'login';

	const [code, setCode] = useState('');
	const inputRef = useRef<TextInput>(null);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCodeChange = (value: string) => {
		setCode(value.replace(/\D/g, '').slice(0, 6));
	};

	const isOtpComplete = code.length === 6;

	const handleVerify = async () => {
		if (code.length !== 6) return;
		const otpCode = code;

		if (isLoginFlow) {
			setError(null);
			setIsSubmitting(true);
			try {
				const data = await authSigninService.verify2FA({ email: identifier, otp: otpCode });
				const accessToken = data?.accessToken;
				const refreshToken = data?.refreshToken ?? '';
				if (accessToken) {
					await authTokenStorage.setTokens(accessToken, refreshToken);
				}
				router.replace('/user/customer');
			} catch (err) {
				setError((err as Error).message ?? 'Verification failed');
			} finally {
				setIsSubmitting(false);
			}
			return;
		}

		router.push({
			pathname: '/auth/reset-password',
			params: { method, identifier, otp: otpCode },
		});
	};

	const handleResend = () => {
		setCode('');
		inputRef.current?.focus();
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
					<Text className="text-2xl text-white font-bold mb-2">
						{isLoginFlow ? 'Enter verification code' : 'Verify OTP'}
					</Text>
					<Text className="text-base text-white/80 text-center px-4">
						Enter the 6-digit code sent to {method === 'email' ? 'your email' : 'your phone'}
						{isLoginFlow ? ' to complete sign in' : ''}
					</Text>
					{identifier && <Text className="text-base text-white/60 text-center px-4 mt-2">{identifier}</Text>}
				</View>

				<TextInput
					ref={inputRef}
					value={code}
					onChangeText={handleCodeChange}
					keyboardType="number-pad"
					maxLength={6}
					placeholder="000000"
					placeholderTextColor="rgba(255,255,255,0.5)"
					className="h-14 bg-white/25 border border-white/40 rounded-lg text-white text-xl font-bold text-center mb-6 px-4"
					selectTextOnFocus
					autoFocus
				/>

				{error ? (
					<View className="mb-3 rounded-lg bg-red-500/20 border border-red-400 px-3 py-2">
						<Text className="text-red-200 text-sm">{error}</Text>
					</View>
				) : null}

				<Pressable
					onPress={handleVerify}
					disabled={!isOtpComplete || isSubmitting}
					className="bg-primary rounded-lg items-center justify-center h-14 mb-4"
				>
					{isSubmitting ? (
						<ActivityIndicator color="white" />
					) : (
						<Text className="text-white text-lg font-bold">Verify</Text>
					)}
				</Pressable>

				<View className="flex-row items-center justify-center mb-6">
					<Text className="text-white/80 text-sm">{"Didn't receive the code? "}</Text>
					<Pressable onPress={handleResend}>
						<Text className="text-white text-sm font-semibold">Resend</Text>
					</Pressable>
				</View>

				<View className="flex-row items-center justify-center mt-6">
					<Text className="text-white/80 text-sm">{isLoginFlow ? 'Wrong account? ' : 'Remember your password? '}</Text>
					<Pressable onPress={() => router.push('/auth/signin')}>
						<Text className="text-white text-sm font-semibold">Sign In</Text>
					</Pressable>
				</View>
			</View>
		</AuthLayout>
	);
}
