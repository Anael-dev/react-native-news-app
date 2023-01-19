import React from "react";
import { TouchableOpacity } from "react-native";

type ButtonProps = {
  onPress: () => void;
  icon?: JSX.Element;
};

const Button: React.FC<ButtonProps> = ({ onPress, icon = null }) =>
  icon && <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;

export default Button;
