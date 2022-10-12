import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NewsHub from './screens/NewsHub';
import Article from './screens/Article';

const Stack = createStackNavigator();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='NewsHub'>
					<Stack.Screen
						name='NewsHub'
						component={NewsHub}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Article'
						component={Article}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
