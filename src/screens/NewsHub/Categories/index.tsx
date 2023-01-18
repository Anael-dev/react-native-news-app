import React, { memo } from "react";
import { View } from "react-native";
import styled from "styled-components";

import Category from "./Category";
import { AVAILABLE_CATEGORIES } from "./consts";

type CategoriesProps = {
  onCategoryPress: (state: string) => void;
  selectedCategory: string;
};

const Categories: React.FC<CategoriesProps> = ({
  onCategoryPress,
  selectedCategory,
}) => (
  <CategoriesContainer>
    {AVAILABLE_CATEGORIES.map((category) => (
      <Category
        key={category}
        name={category}
        onCategoryPress={onCategoryPress}
        isSelected={selectedCategory === category}
      />
    ))}
  </CategoriesContainer>
);

const CategoriesContainer = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export default memo(Categories);
