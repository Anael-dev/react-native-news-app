import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import Article from "../../screens/Article";
import { Article as ArticleInterface } from "../NewsItem";
import NewsHub from "../../screens/NewsHub";

interface AricleScreenParams
  extends Omit<ArticleInterface, "publishedAt" | "source" | "url"> {
  publishedAt: string;
}

export type RootStackParamList = {
  NewsHub: undefined;
  Article: AricleScreenParams;
};

export type NavigationType = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

function Navigator() {
  return (
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
  );
}

export default Navigator;
