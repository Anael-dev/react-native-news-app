import React, { useCallback, useMemo, useState } from "react";
import { ListRenderItem, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useQuery } from "react-query";
import styled from "styled-components";

import Categories from "../../components/Categories";
import SearchBar from "../../components/SearchBar";
import fetchNewsAction from "../../api/newsApi/fetchNewsAction";
import NewsItem, { Article } from "../../components/NewsItem";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder";
import Loader from "../../components/Loader";

export interface NewsResponseType {
  status: string;
  totalResults: number;
  articles: Article[];
}
interface Id {
  id: string;
}

export type ArticleWithId = Article & Id;

function NewsHub() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: results,
    refetch,
    isLoading,
    isFetching,
  } = useQuery<ArticleWithId[] | undefined>(
    ["news", { searchQuery, selectedCategory }],
    async () => await fetchNewsAction(searchQuery, selectedCategory)
  );

  const keyExtractor = useCallback(
    (item: Article) => `${item.publishedAt}${item.title}`,
    []
  );

  const renderItem: ListRenderItem<ArticleWithId> = useCallback(
    ({ item }): JSX.Element => {
      return <NewsItem data={item} />;
    },
    []
  );

  const emptyListView = useMemo((): JSX.Element => {
    if (isLoading || isFetching) {
      return <Loader />;
    }
    if (searchQuery) {
      return (
        <EmptyListPlaceholder text={`No results found for "${searchQuery}"`} />
      );
    }
    return <EmptyListPlaceholder />;
  }, [searchQuery, isLoading, isFetching]);

  return (
    <Container>
      <SafeAreaViewContainer>
        <SearchBar onChange={setSearchQuery} onSubmit={refetch} />
        <Categories
          onCategoryPress={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <Container>
          <KeyboardAwareFlatList
            keyboardShouldPersistTaps="always"
            data={results}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            shouldRasterizeIOS
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            ListEmptyComponent={emptyListView}
            scrollEnabled={!!results?.length}
          />
        </Container>
      </SafeAreaViewContainer>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;

const SafeAreaViewContainer = styled(SafeAreaView)`
  flex: 1;
`;

export default NewsHub;
