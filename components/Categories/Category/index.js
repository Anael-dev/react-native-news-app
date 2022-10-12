import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function Category({ name, onCategoryPress, isSelected }) {
	const handlePress = useCallback(() => {
		if (isSelected) {
			onCategoryPress('');
		} else {
			onCategoryPress(name);
		}
	}, [onCategoryPress, isSelected]);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={handlePress}
			style={[styles.container, isSelected ? styles.selectedButton : {}]}>
			<Text style={[styles.text, isSelected ? styles.selectedButtonText : {}]}>
				{name}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#01F0D9',
		borderRadius: 7,
		paddingHorizontal: 10,
		paddingVertical: 8,
		marginVertical: 5,
		marginRight: 10,
	},
	selectedButton: {
		backgroundColor: '#00B49F',
	},
	text: { fontSize: 14, textAlign: 'center' },
	selectedButtonText: {
		fontWeight: '600',
	},
});

export default Category;
