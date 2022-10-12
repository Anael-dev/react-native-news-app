import React from 'react';
import { StyleSheet, View } from 'react-native';
import Category from './Category';
import { AVAILABLE_CATEGORIES } from './consts';

function Categories({ onCategoryPress, selectedCategory }) {
	return (
		<View style={styles.container}>
			{AVAILABLE_CATEGORIES.map((category) => (
				<Category
					key={category}
					name={category}
					onCategoryPress={onCategoryPress}
					isSelected={selectedCategory === category}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

export default Categories;
