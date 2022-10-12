import React, { useCallback, useMemo } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';

import { IMAGE_SIZE, MAX_DESCRIPTION_CHARS, PLACEHOLDER_IMAGE_URL } from './consts';

function NewsItem({ data = {} }) {
	const { title, publishedAt, urlToImage, description, content, author } = data;
	const { width } = useWindowDimensions();
	const navigation = useNavigation();

	const articleImage = useMemo(() => {
		if (urlToImage) {
			return <Image source={{ uri: urlToImage }} style={styles.image} />;
		} else {
			return (
				<Image
					source={{
						uri: PLACEHOLDER_IMAGE_URL,
					}}
					style={styles.image}
				/>
			);
		}
	}, [urlToImage, styles.image]);

	const formattedPublishedDate = useMemo(() => {
		return new Date(publishedAt).toLocaleString();
	}, [publishedAt]);

	const handlePress = useCallback(() => {
		if (navigation.isFocused()) {
			navigation.push('Article', {
				title,
				publishedAt: formattedPublishedDate,
				author,
				urlToImage,
				description,
				content,
			});
		}
	}, [navigation]);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={handlePress}
			style={styles.container}>
			<RenderHtml contentWidth={width} source={{ html: title }} />
			<Text style={styles.text}>{formattedPublishedDate}</Text>
			{articleImage}
			<Text style={styles.text}>
				{description?.substring(0, MAX_DESCRIPTION_CHARS)}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		paddingHorizontal: 16,
		paddingVertical: 8,
		margin: 10,
		backgroundColor: '#EFEFEF',
		borderWidth: 1,
		borderColor: '#9D9D9D',
	},
	text: { fontSize: 14, paddingVertical: 5 },
	selectedButtonText: {
		fontWeight: '600',
	},
	image: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
	},
});

export default NewsItem;
