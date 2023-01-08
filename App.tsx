import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClientProvider, QueryClient } from "react-query";

import NewsHub from "./screens/NewsHub";
import Article from "./screens/Article";
import { Article as ArticleInterface } from "./components/NewsItem";

export type RootStackParamList = {
  NewsHub: undefined;
  Article: ArticleInterface;
};

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="NewsHub">
            <Stack.Screen
              name="NewsHub"
              component={NewsHub}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Article"
              component={Article}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
