import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

type CategoryProps = {
  name: string;
  onCategoryPress: (category: string) => void;
  isSelected: boolean;
};

const Category: React.FC<CategoryProps> = ({
  name,
  onCategoryPress,
  isSelected,
}) => {
  const handlePress = useCallback(() => {
    if (isSelected) {
      onCategoryPress("");
    } else {
      onCategoryPress(name);
    }
  }, [onCategoryPress, isSelected]);

  return (
    <CategoryButton
      activeOpacity={0.7}
      onPress={handlePress}
      isSelected={isSelected}
    >
      <CategoryText isSelected={isSelected}>{name}</CategoryText>
    </CategoryButton>
  );
};

const CategoryButton = styled(TouchableOpacity)<{
  isSelected: boolean;
}>`
  border-radius: 7px;
  padding-horizontal: 15px;
  padding-vertical: 8px;
  margin-vertical: 5px;
  margin: 5px;
  background-color: ${({ isSelected }) => (isSelected ? "#00B49F" : "#01F0D9")};
`;

const CategoryText = styled(Text)<{
  isSelected: boolean;
}>`
  font-size: 14px;
  text-align: center;
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
`;

export default Category;
