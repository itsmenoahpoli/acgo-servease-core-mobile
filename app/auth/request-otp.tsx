import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { BRAND_LOGO } from '@/assets';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { formatPhoneNumber } from '@/utils/helpers.util';

interface RequestOTPFormData {
	email?: string;
	contactNumber?: string;
}

type OTPMethod = 'email' | 'sms';

export default function RequestOTP() {
	const router = useRouter();
	const [otpMethod, setOtpMethod] = useState<OTPMethod>('email');
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<RequestOTPFormData>({
		defaultValues: {
			email: '',
			contactNumber: '',
		},
	});

	const handlePhoneChange = (onChange: (value: string) => void, value: string) => {
		const formatted = formatPhoneNumber(value);
		onChange(formatted);
	};

	const onSubmit = (data: RequestOTPFormData) => {
		if (otpMethod === 'email') {
			router.push({
				pathname: '/auth/verify-otp',
				params: { method: 'email', identifier: data.email },
			});
		} else {
			router.push({
				pathname: '/auth/verify-otp',
				params: { method: 'sms', identifier: data.contactNumber },
			});
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
					<Text className="text-2xl text-white font-bold mb-2">Forgot Password</Text>
					<Text className="text-base text-white/80">Choose a method to reset your password</Text>
				</View>

				<View className="flex-row gap-3 mb-6">
					<Pressable
						onPress={() => setOtpMethod('email')}
						className={`flex-1 rounded-lg items-center justify-center h-12 border-2 ${
							otpMethod === 'email'
								? 'bg-primary/20 border-primary'
								: 'bg-white/10 border-white/30'
						}`}
					>
						<Text
							className={`text-base font-semibold ${
								otpMethod === 'email' ? 'text-white' : 'text-white/70'
							}`}
						>
							Email
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setOtpMethod('sms')}
						className={`flex-1 rounded-lg items-center justify-center h-12 border-2 ${
							otpMethod === 'sms'
								? 'bg-primary/20 border-primary'
								: 'bg-white/10 border-white/30'
						}`}
					>
						<Text
							className={`text-base font-semibold ${
								otpMethod === 'sms' ? 'text-white' : 'text-white/70'
							}`}
						>
							SMS
						</Text>
					</Pressable>
				</View>

				{otpMethod === 'email' ? (
					<View className="mb-6">
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
				) : (
					<View className="mb-6">
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
				)}

				<Pressable
					onPress={handleSubmit(onSubmit)}
					className="bg-primary rounded-lg items-center justify-center h-14 mb-6"
				>
					<Text className="text-white text-lg font-bold">Send OTP</Text>
				</Pressable>

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

