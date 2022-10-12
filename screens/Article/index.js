import React, { useCallback } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native';
import {
	useNavigation,
	useRoute,
	StackActions,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';

const IMAGE_SIZE = 100;

function Article() {
	const {
		params: { title, publishedAt, author, urlToImage, description, content },
	} = useRoute();
	const { width } = useWindowDimensions();
	const navigation = useNavigation();

	const handleClickBack = useCallback(() => {
		if (navigation.isFocused()) {
			navigation.dispatch({
				...StackActions.pop(),
			});
		}
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={handleClickBack}>
				<AntDesign name='caretleft' size={24} color='black' />
			</TouchableOpacity>
			<ScrollView style={styles.content}>
				<RenderHtml contentWidth={width} source={{ html: title }} />
				<Text style={styles.text}>{publishedAt}</Text>
				<Text style={styles.text}>{author}</Text>
				{urlToImage && (
					<Image source={{ uri: urlToImage }} style={styles.image} />
				)}
				<Text style={styles.text}>{description}</Text>
				<RenderHtml contentWidth={width} source={{ html: content }} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	text: {
		paddingVertical: 10,
	},
	image: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
	},
	content: {
		paddingVertical: 20,
	},
});
export default Article;
