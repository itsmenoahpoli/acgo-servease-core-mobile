import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BRAND_LOGO } from '@/assets';
import { AuthLayout } from '@/components/layouts/AuthLayout';

export default function VerifyOTP() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const method = (params.method as 'email' | 'sms') || 'email';
	const identifier = (params.identifier as string) || '';
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const inputRefs = useRef<(TextInput | null)[]>([]);

	const handleOtpChange = (value: string, index: number) => {
		if (value.length > 1) {
			const digits = value.replace(/\D/g, '').split('').slice(0, 6);
			const newOtp = [...otp];
			digits.forEach((digit, i) => {
				if (index + i < 6) {
					newOtp[index + i] = digit;
				}
			});
			setOtp(newOtp);
			const nextIndex = Math.min(index + digits.length, 5);
			inputRefs.current[nextIndex]?.focus();
			return;
		}

		if (value && !/^\d$/.test(value)) {
			return;
		}

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key === 'Backspace' && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const isOtpComplete = otp.every((digit) => digit !== '');

	const handleVerify = () => {
		const otpCode = otp.join('');
		if (otpCode.length === 6) {
			router.push({
				pathname: '/auth/reset-password',
				params: { method, identifier, otp: otpCode },
			});
		}
	};

	const handleResend = () => {
		setOtp(['', '', '', '', '', '']);
		inputRefs.current[0]?.focus();
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
					<Text className="text-2xl text-white font-bold mb-2">Verify OTP</Text>
					<Text className="text-base text-white/80 text-center px-4">
						Enter the 6-digit code sent to {method === 'email' ? 'your email' : 'your phone'}
					</Text>
					{identifier && (
						<Text className="text-base text-white/60 text-center px-4 mt-2">
							{identifier}
						</Text>
					)}
				</View>

				<View className="flex-row justify-between mb-6">
					{otp.map((digit, index) => (
						<TextInput
							key={index}
							ref={(ref) => {
								inputRefs.current[index] = ref;
							}}
							value={digit}
							onChangeText={(value) => handleOtpChange(value, index)}
							onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
							keyboardType="number-pad"
							maxLength={6}
							className="w-12 h-14 bg-white/25 border border-white/40 rounded-lg text-white text-xl font-bold text-center"
							selectTextOnFocus
						/>
					))}
				</View>

				<Pressable
					onPress={handleVerify}
					disabled={!isOtpComplete}
					className={`rounded-lg items-center justify-center h-14 mb-4 ${
						isOtpComplete ? 'bg-primary' : 'bg-primary/50'
					}`}
				>
					<Text className="text-white text-lg font-bold">Verify</Text>
				</Pressable>

				<View className="flex-row items-center justify-center mb-6">
					<Text className="text-white/80 text-sm">Didn't receive the code? </Text>
					<Pressable onPress={handleResend}>
						<Text className="text-white text-sm font-semibold">Resend</Text>
					</Pressable>
				</View>

				<View className="flex-row items-center justify-center mt-6">
					<Text className="text-white/80 text-sm">Remember your password? </Text>
					<Pressable onPress={() => router.push('/auth/signin')}>
						<Text className="text-white text-sm font-semibold">Sign In</Text>
					</Pressable>
				</View>
			</View>
		</AuthLayout>
	);
}

