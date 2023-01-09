import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

type EmptyListProps = {
  text?: string;
};

const EmptyListPlaceholder: React.FC<EmptyListProps> = ({
  text = "No Data Available",
}) => {
  return <EmptyListQuery>{text}</EmptyListQuery>;
};

const EmptyListQuery = styled(Text)`
  flex: 1;
  padding-top: 30px;
  text-align: center;
`;

export default EmptyListPlaceholder;
