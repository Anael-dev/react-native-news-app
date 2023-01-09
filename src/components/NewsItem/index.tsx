import React, { useCallback, useEffect, useMemo } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RenderHtml from "react-native-render-html";

import {
  IMAGE_SIZE,
  MAX_DESCRIPTION_CHARS,
  PLACEHOLDER_IMAGE_URL,
} from "./consts";
import styled from "styled-components";
import { NavigationType } from "../Navigator";

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
  data: Article;
};

const NewsItem: React.FC<NewsItemProps> = ({ data }) => {
  const { title, publishedAt, urlToImage, description, content, author } = data;
  const { width } = useWindowDimensions();
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
      });
    }
  }, [navigation, formattedPublishedDate]);

  return (
    <TouchableContainer activeOpacity={0.7} onPress={handlePress}>
      <RenderHtml contentWidth={width} source={{ html: title }} />
      <ItemText>{formattedPublishedDate}</ItemText>
      {articleImage}
      <ItemText>{description?.substring(0, MAX_DESCRIPTION_CHARS)}</ItemText>
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  border-radius: 5px;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  margin: 10px;
  background-color: "#EFEFEF";
  border-width: 1px;
  border-color: "#9D9D9D";
`;

const ItemText = styled(Text)`
  font-size: 14px;
  padding-vertical: 5px;
`;

const ItemImage = styled(Image)`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;
export default NewsItem;
