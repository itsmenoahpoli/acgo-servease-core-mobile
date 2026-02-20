import { View, Text, Modal, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Confetti } from './Confetti';

export interface BookingSuccessModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	message?: string;
	buttonText?: string;
}

export function BookingSuccessModal({
	visible,
	onClose,
	title = 'Booking confirmed!',
	message = 'Your service has been successfully booked.',
	buttonText = 'Done',
}: BookingSuccessModalProps) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View className="flex-1 items-center justify-center bg-black/30 px-6">
				{visible && <Confetti />}
				<View className="bg-white rounded-2xl p-6 items-center max-w-[320px] w-full shadow-xl">
					<View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
						<Ionicons name="checkmark-circle" size={48} color="#7a0f1d" />
					</View>
					<Text className="text-xl font-bold text-gray-900 text-center mb-2">{title}</Text>
					<Text className="text-base text-gray-600 text-center mb-6">{message}</Text>
					<Pressable
						onPress={onClose}
						className="bg-primary rounded-xl py-3 px-8 min-w-[140px] items-center"
					>
						<Text className="text-white font-semibold text-base">{buttonText}</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}
