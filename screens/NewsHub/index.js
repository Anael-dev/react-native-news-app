import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import Categories from '../../components/Categories';
import SearchBar from '../../components/SearchBar';
import useFetchNews from '../../hooks/useFetchNews';
import NewsItem from '../../components/NewsItem';

function NewsHub() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const { fetchNewsAction, results } = useFetchNews();

	const fetchFilteredNews = useCallback(async () => {
		fetchNewsAction(searchQuery, selectedCategory);
	}, [searchQuery, selectedCategory]);

	useEffect(() => {
		fetchFilteredNews();
	}, [fetchFilteredNews]);

	const keyExtractor = useCallback(
		(item, index) => `${item.source.id}${index}`,
		[]
	);
	const renderItem = useCallback(({ item }) => {
		return <NewsItem data={item} />;
	}, []);

	const emptyListView = useMemo(() => {
		if (searchQuery) {
			return (
				<Text
					style={
						styles.emptyListQuery
					}>{`No results found for "${searchQuery}"`}</Text>
			);
		} else {
			return <Text style={styles.emptyListQuery}>No Data Available</Text>;
		}
	}, [styles.emptyListQuery, searchQuery]);

	return (
		<View style={styles.container}>
			<StatusBar animated />
			<SafeAreaView
				forceInset={{ top: 'always', bottom: 'never' }}
				style={styles.container}>
				<SearchBar onChange={setSearchQuery} onSubmit={fetchFilteredNews} />
				<Categories
					onCategoryPress={setSelectedCategory}
					selectedCategory={selectedCategory}
				/>
				<View style={styles.container}>
					<KeyboardAwareFlatList
						keyboardShouldPersistTaps='always'
						data={results}
						keyExtractor={keyExtractor}
						renderItem={renderItem}
						shouldRasterizeIOS
						renderToHardwareTextureAndroid
						removeClippedSubviews={false}
						ListEmptyComponent={emptyListView}
						scrollEnabled={results.length > 0}
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
		textAlign: 'center',
	},
});

export default NewsHub;
