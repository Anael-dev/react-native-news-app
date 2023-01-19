import React, { useCallback, useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

import { RootStackParamList } from "../../components/Navigator";
import Navbar from "../../components/Navbar";
import ArticleContent from "./ArticleContent";
import FavoriteArticleButton from "./FavoriteArticleButton";
import { addArticleToUserSession } from "../../api/salesforceOrg/userArticleSession";

type ArticeleScreenRouteProp = RouteProp<RootStackParamList, "Article">;

function Article() {
  const {
    params: { title, description, url: link, id },
  } = useRoute<ArticeleScreenRouteProp>();

  const handlePageMount = useCallback(
    () => addArticleToUserSession({ title, link, id }),
    [title, link, id]
  );

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  return (
    <SafeAreaViewContainer>
      <Navbar
        rightActionButton={
          <FavoriteArticleButton
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
