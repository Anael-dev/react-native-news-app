import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useQuery } from "react-query";

import Categories from "../../components/Categories";
import SearchBar from "../../components/SearchBar";
import { fetchNewsAction } from "../../hooks/useFetchNews";
import NewsItem, { Article } from "../../components/NewsItem";

export interface NewsResponseType {
  status: string;
  totalResults: number;
  articles: Article[];
}

function NewsHub() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: results, refetch } = useQuery<NewsResponseType, undefined>(
    ["news", { searchQuery, selectedCategory }],
    async () => await fetchNewsAction(searchQuery, selectedCategory)
  );

  const keyExtractor = useCallback(
    (item: Article, index: number) => `${item.source.name}${index}`,
    []
  );
  const renderItem: ListRenderItem<Article> = useCallback(
    ({ item }): JSX.Element => {
      return <NewsItem data={item} />;
    },
    []
  );

  const emptyListView = useMemo((): JSX.Element => {
    if (searchQuery) {
      return (
        <Text
          style={styles.emptyListQuery}
        >{`No results found for "${searchQuery}"`}</Text>
      );
    } else {
      return <Text style={styles.emptyListQuery}>No Data Available</Text>;
    }
  }, [styles.emptyListQuery, searchQuery]);

  return (
    <View style={styles.container}>
      <StatusBar animated />
      <SafeAreaView style={styles.container}>
        <SearchBar onChange={setSearchQuery} onSubmit={refetch} />
        <Categories
          onCategoryPress={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <View style={styles.container}>
          <KeyboardAwareFlatList
            keyboardShouldPersistTaps="always"
            data={results?.articles}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            shouldRasterizeIOS
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            ListEmptyComponent={emptyListView}
            scrollEnabled={!!results?.articles?.length}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListQuery: {
    flex: 1,
    paddingTop: 30,
    textAlign: "center",
  },
});

export default NewsHub;
