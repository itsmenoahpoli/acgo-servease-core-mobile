import { useState } from 'react';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface TimePickerProps {
	value: Date | null;
	onChange: (date: Date) => void;
	placeholder?: string;
	label?: string;
	containerClassName?: string;
}

const formatTime = (date: Date): string =>
	date.toLocaleTimeString(undefined, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

/** Base date used when value is null; only time part is used */
const getDefaultTimeDate = (): Date => {
	const d = new Date();
	d.setHours(9, 0, 0, 0);
	return d;
};

export function TimePicker({
	value,
	onChange,
	placeholder = 'Select time',
	label,
	containerClassName = '',
}: TimePickerProps) {
	const [showModal, setShowModal] = useState(false);
	const [tempDate, setTempDate] = useState<Date>(() => value ?? getDefaultTimeDate());

	const handleOpen = () => {
		setTempDate(value ?? getDefaultTimeDate());
		setShowModal(true);
	};

	const handleConfirm = () => {
		onChange(tempDate);
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	const handlePickerChange = (_event: unknown, selectedDate: Date | undefined) => {
		if (selectedDate != null) setTempDate(selectedDate);
	};

	if (Platform.OS === 'android') {
		return (
			<View className={containerClassName}>
				{label ? <Text className="text-xs uppercase text-gray-500 mb-2">{label}</Text> : null}
				<Pressable
					onPress={() => setShowModal(true)}
					className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between"
				>
					<Text className={value ? 'text-base text-gray-900' : 'text-base text-gray-400'}>
						{value ? formatTime(value) : placeholder}
					</Text>
					<Ionicons name="time-outline" size={20} color="#6B7280" />
				</Pressable>
				{showModal && (
					<DateTimePicker
						value={tempDate}
						mode="time"
						display="default"
						onChange={(event: { type: string }, selectedDate: Date | undefined) => {
							setShowModal(false);
							if (event.type === 'set' && selectedDate) onChange(selectedDate);
						}}
					/>
				)}
			</View>
		);
	}

	return (
		<View className={containerClassName}>
			{label ? <Text className="text-xs uppercase text-gray-500 mb-2">{label}</Text> : null}
			<Pressable
				onPress={handleOpen}
				className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between"
			>
				<Text className={value ? 'text-base text-gray-900' : 'text-base text-gray-400'}>
					{value ? formatTime(value) : placeholder}
				</Text>
				<Ionicons name="time-outline" size={20} color="#6B7280" />
			</Pressable>
			<Modal visible={showModal} transparent animationType="fade">
				<Pressable className="flex-1 justify-end" onPress={handleCancel}>
					<Pressable className="bg-white rounded-t-2xl pt-4 pb-8 px-4" onPress={(e) => e.stopPropagation()}>
						<View className="flex-row items-center justify-between mb-2">
							<Pressable onPress={handleCancel} hitSlop={12}>
								<Text className="text-base text-gray-500">Cancel</Text>
							</Pressable>
							<Text className="text-base font-semibold text-gray-900">Select time</Text>
							<Pressable onPress={handleConfirm} hitSlop={12}>
								<Text className="text-base text-primary font-semibold">Done</Text>
							</Pressable>
						</View>
						<DateTimePicker value={tempDate} mode="time" display="spinner" onChange={handlePickerChange} />
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
}
