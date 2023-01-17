import React, { useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  IMAGE_SIZE,
  MAX_DESCRIPTION_CHARS,
  PLACEHOLDER_IMAGE_URL,
} from "./consts";
import styled from "styled-components";
import { NavigationType } from "../Navigator";
import { ArticleWithId } from "../../screens/NewsHub";

export interface Article {
  author: null | string;
  title: string;
  description: null | string;
  url: string;
  urlToImage: null | string;
  publishedAt: Date;
  content: null | string;
  source: Source;
}

export interface Source {
  id: null;
  name: string;
}

type NewsItemProps = {
  data: ArticleWithId;
};

const NewsItem: React.FC<NewsItemProps> = ({ data }) => {
  const {
    title,
    publishedAt,
    urlToImage,
    description,
    content,
    author,
    url,
    id,
  } = data;
  const navigation = useNavigation<NavigationType>();

  const articleImage = useMemo((): JSX.Element => {
    if (urlToImage) {
      return <ItemImage source={{ uri: urlToImage }} />;
    } else {
      return (
        <ItemImage
          source={{
            uri: PLACEHOLDER_IMAGE_URL,
          }}
        />
      );
    }
  }, [urlToImage]);

  const formattedPublishedDate = useMemo((): string => {
    return new Date(publishedAt).toLocaleString();
  }, [publishedAt]);

  const handlePress = useCallback(() => {
    if (navigation.isFocused()) {
      navigation.push("Article", {
        title,
        publishedAt: formattedPublishedDate,
        author,
        urlToImage,
        description,
        content,
        url,
        id,
      });
    }
  }, [navigation, formattedPublishedDate]);

  return (
    <TouchableContainer activeOpacity={0.7} onPress={handlePress}>
      <ItemTitle numberOfLines={2}>{title}</ItemTitle>
      <ItemPublishedDate>{formattedPublishedDate}</ItemPublishedDate>
      <ItemContent>
        {articleImage}
        <ItemText>{description?.substring(0, MAX_DESCRIPTION_CHARS)}</ItemText>
      </ItemContent>
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  border-radius: 5px;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  margin: 10px;
  background-color: #eeeee;
  border-width: 0.5px;
  border-color: #9d9d9d;
  height: 160px;
`;

const ItemContent = styled(View)`
  flex-direction: row;
  flex: 1;
  padding-vertical: 10px;
  justify-content: space-between;
`;

const ItemText = styled(Text)`
  font-size: 12px;
  font-weight: 200;
  font-family: Helvetica;
  padding-left: 10px;
  flex: 0.7;
`;

const ItemPublishedDate = styled(Text)`
  font-size: 12px;
  font-weight: 200;
  font-family: Helvetica;
  opacity: 0.8;
`;

const ItemImage = styled(Image)`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 5px;
  flex: 0.3;
`;

const ItemTitle = styled(Text)`
  font-weight: 600;
  font-family: Helvetica;
  color: #333;
`;

export default NewsItem;
