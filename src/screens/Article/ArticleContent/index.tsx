import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import styled from "styled-components";

import { RootStackParamList } from "../../../components/Navigator";
import { IMAGE_SIZE } from "../consts";

type ArticeleScreenRouteProp = RouteProp<RootStackParamList, "Article">;

function ArticleContent() {
  const {
    params: { title, publishedAt, author, urlToImage, description, content },
  } = useRoute<ArticeleScreenRouteProp>();

  return (
    <ScrollViewContainer>
      <ItemTitle>{title}</ItemTitle>
      <ItemPublishedDate>{publishedAt.toString()}</ItemPublishedDate>
      <ItemPublishedDate>{author}</ItemPublishedDate>
      {urlToImage && <ArticleImage source={{ uri: urlToImage }} />}
      <ArticleText>{description}</ArticleText>
      <ArticleText>{content}</ArticleText>
    </ScrollViewContainer>
  );
}

const ScrollViewContainer = styled(ScrollView)`
  padding-vertical: 30px;
  padding-horizontal: 20px;
`;

const ItemPublishedDate = styled(Text)`
  font-size: 14px;
  font-weight: 200;
  font-family: Helvetica;
  opacity: 0.8;
`;

const ArticleText = styled(Text)`
  padding-top: 10px;
  font-size: 14px;
  font-weight: 400;
  font-family: Helvetica;
`;

const ArticleImage = styled(Image)`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 5px;
  margin-vertical: 20px;
`;

const ItemTitle = styled(Text)`
  font-weight: 600;
  font-family: Helvetica;
  color: #333;
  font-size: 18px;
  padding-bottom: 5px;
`;

export default ArticleContent;
