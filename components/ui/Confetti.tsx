import { useEffect, useMemo, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';

const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#EC4899', '#7a0f1d'];
const PARTICLE_COUNT = 40;

function seed() {
	const x = Math.sin(++confettiSeed * 9871) * 10000;
	return x - Math.floor(x);
}
let confettiSeed = 1;

export function Confetti() {
	const { width, height } = Dimensions.get('window');
	const centerX = width / 2;
	const centerY = height / 2;
	const progress = useRef(new Animated.Value(0)).current;

	const particles = useMemo(() => {
		return Array.from({ length: PARTICLE_COUNT }, () => {
			const endX = (seed() - 0.5) * width * 0.8;
			const endY = centerY + seed() * height * 0.4 - centerY;
			const rotateDeg = (seed() - 0.5) * 720;
			return {
				translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, endX] }),
				translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, endY] }),
				rotate: progress.interpolate({
					inputRange: [0, 1],
					outputRange: ['0deg', `${rotateDeg}deg`],
				}),
				opacity: progress.interpolate({ inputRange: [0.5, 1], outputRange: [1, 0] }),
				color: COLORS[Math.floor(seed() * COLORS.length)],
				width: 6 + seed() * 6,
				height: 6 + seed() * 8,
			};
		});
	}, [progress, width, height, centerY]);

	useEffect(() => {
		Animated.timing(progress, {
			toValue: 1,
			duration: 1400,
			useNativeDriver: true,
		}).start();
	}, [progress]);

	return (
		<View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
			{particles.map((p, i) => (
				<Animated.View
					key={i}
					style={{
						position: 'absolute',
						left: centerX - p.width / 2,
						top: centerY - p.height / 2,
						width: p.width,
						height: p.height,
						backgroundColor: p.color,
						borderRadius: 2,
						transform: [
							{ translateX: p.translateX },
							{ translateY: p.translateY },
							{ rotate: p.rotate },
						],
						opacity: p.opacity,
					}}
				/>
			))}
		</View>
	);
}
