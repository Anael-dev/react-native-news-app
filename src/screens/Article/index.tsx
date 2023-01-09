import React, { useCallback } from "react";
import {
  Image,
  ScrollView,
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
import styled from "styled-components";

import { RootStackParamList } from "../../components/Navigator";

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
    <SafeAreaViewContainer>
      <TouchableOpacity onPress={handleClickBack}>
        <AntDesign name="caretleft" size={24} color="black" />
      </TouchableOpacity>
      <ScrollViewContainer>
        <RenderHtml contentWidth={width} source={{ html: title }} />
        <ArticleText>{publishedAt.toString()}</ArticleText>
        <ArticleText>{author}</ArticleText>
        {urlToImage && <ArticleImage source={{ uri: urlToImage }} />}
        <ArticleText>{description}</ArticleText>
        {content && (
          <RenderHtml contentWidth={width} source={{ html: content }} />
        )}
      </ScrollViewContainer>
    </SafeAreaViewContainer>
  );
}

const SafeAreaViewContainer = styled(SafeAreaView)`
  flex: 1;
  padding-horizontal: 20px;
`;

const ScrollViewContainer = styled(ScrollView)`
  padding-vertical: 30px;
`;

const ArticleText = styled(Text)`
  padding-vertical: 10px;
`;

const ArticleImage = styled(Image)`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;

export default Article;
