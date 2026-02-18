import { ScrollView, View } from 'react-native';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';

const CARD_WIDTH = 180;
const IMAGE_HEIGHT = 160;
const SHIMMER_PLACEHOLDERS = 5;

export function ServicesNearYouList() {
	return (
		<ShimmerProvider duration={1200}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 16 }}
				className="flex-row gap-5"
			>
				{Array.from({ length: SHIMMER_PLACEHOLDERS }).map((_, i) => (
					<View key={i} style={{ width: CARD_WIDTH, marginRight: 24 }}>
						<Shimmer
							style={{
								width: CARD_WIDTH,
								height: IMAGE_HEIGHT,
								borderRadius: 12,
								backgroundColor: '#eee',
							}}
						/>
						<View className="mt-3 px-1">
							<Shimmer
								style={{
									width: 120,
									height: 18,
									borderRadius: 4,
									backgroundColor: '#eee',
									marginBottom: 8,
								}}
							/>
							<Shimmer
								style={{
									width: 144,
									height: 14,
									borderRadius: 4,
									backgroundColor: '#eee',
								}}
							/>
						</View>
					</View>
				))}
			</ScrollView>
		</ShimmerProvider>
	);
}
