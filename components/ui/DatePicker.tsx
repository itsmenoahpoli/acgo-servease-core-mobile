import { useState } from 'react';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface DatePickerProps {
	value: Date | null;
	onChange: (date: Date) => void;
	placeholder?: string;
	label?: string;
	minimumDate?: Date;
	maximumDate?: Date;
	containerClassName?: string;
}

const formatDate = (date: Date): string =>
	date.toLocaleDateString(undefined, {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

export function DatePicker({
	value,
	onChange,
	placeholder = 'Select date',
	label,
	minimumDate,
	maximumDate,
	containerClassName = '',
}: DatePickerProps) {
	const [showModal, setShowModal] = useState(false);
	const [tempDate, setTempDate] = useState<Date>(() => value ?? new Date());

	const handleOpen = () => {
		setTempDate(value ?? new Date());
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
						{value ? formatDate(value) : placeholder}
					</Text>
					<Ionicons name="calendar-outline" size={20} color="#6B7280" />
				</Pressable>
				{showModal && (
					<DateTimePicker
						value={tempDate}
						mode="date"
						display="default"
						minimumDate={minimumDate}
						maximumDate={maximumDate}
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
					{value ? formatDate(value) : placeholder}
				</Text>
				<Ionicons name="calendar-outline" size={20} color="#6B7280" />
			</Pressable>
			<Modal visible={showModal} transparent animationType="fade">
				<Pressable className="flex-1 justify-end bg-black/40" onPress={handleCancel}>
					<Pressable className="bg-white rounded-t-2xl pt-4 pb-8 px-4" onPress={(e) => e.stopPropagation()}>
						<View className="flex-row items-center justify-between mb-2">
							<Pressable onPress={handleCancel} hitSlop={12}>
								<Text className="text-base text-gray-500">Cancel</Text>
							</Pressable>
							<Text className="text-base font-semibold text-gray-900">Select date</Text>
							<Pressable onPress={handleConfirm} hitSlop={12}>
								<Text className="text-base text-primary font-semibold">Done</Text>
							</Pressable>
						</View>
						<DateTimePicker
							value={tempDate}
							mode="date"
							display="spinner"
							minimumDate={minimumDate}
							maximumDate={maximumDate}
							onChange={handlePickerChange}
						/>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
}
