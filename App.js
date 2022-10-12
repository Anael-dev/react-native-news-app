import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		'Avenir-Heavy-900': require('./assets/fonts/Avenir-Heavy.ttf'),
		'Avenir-Roman-400': require('./assets/fonts/Avenir-Roman.ttf'),
		'Lato-Regular-400': require('./assets/fonts/Lato-Regular.ttf'),
		'Lato-Semi-Bold-600': require('./assets/fonts/Lato-Semibold.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container} onLayout={onLayoutRootView}>
					<Text style={{ fontFamily: 'Avenir-Heavy-900' }}>Hi!</Text>
					<StatusBar style='auto' />
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
