import React, { useCallback, useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

import { RootStackParamList } from "../../components/Navigator";
import insertUserReview from "../../api/salesforceOrg/insertUserReview";
import FavoriteButton from "../../components/FavoriteButton";
import Navbar from "../../components/Navbar";
import ArticleContent from "./ArticleContent";

type ArticeleScreenRouteProp = RouteProp<RootStackParamList, "Article">;

function Article() {
  const {
    params: { title, description, url: link, id },
  } = useRoute<ArticeleScreenRouteProp>();

  const handlePageMount = useCallback(
    () => insertUserReview({ title, link, id }),
    [title, link, id]
  );

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  return (
    <SafeAreaViewContainer>
      <Navbar
        rightActionButton={
          <FavoriteButton
            {...{
              title,
              link,
              description,
              id,
            }}
          />
        }
      />
      <ArticleContent />
    </SafeAreaViewContainer>
  );
}

const SafeAreaViewContainer = styled(SafeAreaView)`
  flex: 1;
`;

export default Article;
