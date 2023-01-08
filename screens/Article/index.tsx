import React, { useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  useNavigation,
  useRoute,
  StackActions,
  RouteProp,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderHtml from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";

const IMAGE_SIZE = 100;

type ArticeleScreenRouteProp = RouteProp<RootStackParamList, "Article">;

function Article() {
  const {
    params: { title, publishedAt, author, urlToImage, description, content },
  } = useRoute<ArticeleScreenRouteProp>();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleClickBack = useCallback(() => {
    if (navigation.isFocused()) {
      navigation.dispatch({
        ...StackActions.pop(),
      });
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleClickBack}>
        <AntDesign name="caretleft" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.content}>
        <RenderHtml contentWidth={width} source={{ html: title }} />
        <Text style={styles.text}>{publishedAt.toString()}</Text>
        <Text style={styles.text}>{author}</Text>
        {urlToImage && (
          <Image source={{ uri: urlToImage }} style={styles.image} />
        )}
        <Text style={styles.text}>{description}</Text>
        {content && (
          <RenderHtml contentWidth={width} source={{ html: content }} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    paddingVertical: 10,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  content: {
    paddingVertical: 20,
  },
});
export default Article;
