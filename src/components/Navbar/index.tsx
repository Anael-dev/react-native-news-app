import React, { useCallback } from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components";

type NavbarProps = {
  rightActionButton?: JSX.Element;
};

const Navbar: React.FC<NavbarProps> = ({ rightActionButton = null }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleClickBack = useCallback(() => {
    if (navigation.isFocused()) {
      navigation.dispatch({
        ...StackActions.pop(),
      });
    }
  }, [navigation]);

  return (
    <NavbarContainer width={width}>
      <TouchableOpacity onPress={handleClickBack}>
        <Ionicons name="ios-chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      {rightActionButton && rightActionButton}
    </NavbarContainer>
  );
};

const NavbarContainer = styled(View)<{
  width: number;
}>`
  flex-direction: row;
  justify-content: space-between;
  background-color: #cccc;
  padding-vertical: 10px;
  width: ${({ width }) => width && `${width}px`};
  padding-horizontal: 20px;
  padding-vertical: 15px;
`;

export default Navbar;
