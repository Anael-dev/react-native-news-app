import React, { useCallback } from "react";
import { Keyboard, Platform, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  onSubmit: () => void;
  onChange: (state: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, onChange }) => {
  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    onSubmit();
  }, [onSubmit]);

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType={Platform.OS === "ios" ? "default" : undefined}
        placeholder={"Search..."}
        returnKeyType="search"
        blurOnSubmit={false}
        spellCheck={false}
        style={styles.input}
        maxLength={20}
        onChangeText={onChange}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D5D5D5",
    height: 50,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
