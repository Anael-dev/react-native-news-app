import React, { memo, useCallback } from "react";
import { Keyboard, Platform, TextInput, View } from "react-native";
import styled from "styled-components";

type SearchBarProps = {
  onSubmit: () => void;
  onChange: (state: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, onChange }) => {
  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    onSubmit();
  }, [onSubmit]);

  return (
    <Container>
      <TextInputContainer
        keyboardType={Platform.OS === "ios" ? "default" : undefined}
        placeholder={"Search..."}
        placeholderTextColor={"gray"}
        returnKeyType="search"
        blurOnSubmit={false}
        spellCheck={false}
        maxLength={20}
        onChangeText={onChange}
        onSubmitEditing={handleSubmit}
      />
    </Container>
  );
};

const Container = styled(View)`
  background-color: #e8e8e8;
  height: 50px;
  margin-horizontal: 16px;
  margin-vertical: 20px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextInputContainer = styled(TextInput)`
  flex: 1;
  font-size: 14px;
  padding-horizontal: 10px;
`;

export default memo(SearchBar);
