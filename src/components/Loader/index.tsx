import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";

type LoaderProps = {
  size?: number;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 24, color = "black" }) => {
  return (
    <Wrapper>
      <Feather name="loader" size={size} color={color} />
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  flex: 1;
  padding-vertical: 20px;
  align-items: center;
`;

export default Loader;
