import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function NewsItem({ data }) {
	const navigation = useNavigation();

	const handlePress = useCallback(() => {
		if (navigation.isFocused()) {
			navigation.push();
		}
	}, [navigation]);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={handlePress}
			style={styles.container}>
			<Text style={styles.text}>{data.title}</Text>
			<Text style={styles.text}>{data.publishedAt}</Text>
			<Text style={styles.text}>{data.publishedAt}</Text>
			<Image source={{ uri: data.urlToImage }} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 8,
		marginVertical: 10,
	},
	text: { fontSize: 14, textAlign: 'center' },
	selectedButtonText: {
		fontWeight: '600',
	},
});

export default NewsItem;
