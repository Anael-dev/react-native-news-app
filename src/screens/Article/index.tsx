import React, { useCallback, useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
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
import insertUserReview from "../../api/salesforceOrg/insertUserReview";
import { IMAGE_SIZE } from "./consts";
import FavoriteButton from "../../components/FavoriteButton";

type ArticeleScreenRouteProp = RouteProp<RootStackParamList, "Article">;

function Article() {
  const {
    params: {
      title,
      publishedAt,
      author,
      urlToImage,
      description,
      content,
      url: link,
      id,
    },
  } = useRoute<ArticeleScreenRouteProp>();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePageMount = useCallback(
    () => insertUserReview({ title, link, id }),
    [title, link, id]
  );

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  const handleClickBack = useCallback(() => {
    if (navigation.isFocused()) {
      navigation.dispatch({
        ...StackActions.pop(),
      });
    }
  }, [navigation]);

  return (
    <SafeAreaViewContainer>
      <NavBar>
        <TouchableOpacity onPress={handleClickBack}>
          <AntDesign name="caretleft" size={24} color="black" />
        </TouchableOpacity>
        <FavoriteButton
          {...{
            title,
            link,
            description,
            id,
          }}
        />
      </NavBar>
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

const NavBar = styled(View)`
  flex-direction: row;
  justify-content: space-between;
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
