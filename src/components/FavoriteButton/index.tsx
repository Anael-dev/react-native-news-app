import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation, useQueryClient } from "react-query";

import {
  deleteFavorite,
  InsertArgs,
  insertFavorite,
} from "../../api/favoritesActions";
import { useFavoritesContext } from "../../context/useFavoriteContext";

type ButtonProps = InsertArgs;

const FavoriteButton: React.FC<ButtonProps> = ({
  title,
  link,
  description,
  id,
}) => {
  const queryClient = useQueryClient();
  const { favorites } = useFavoritesContext();

  const addFavoriteMutation = useMutation({
    mutationFn: insertFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isFavorite = useMemo(() => !!favorites?.[id], [favorites]);

  const handleToggleStarPress = useCallback(async () => {
    if (isFavorite) {
      deleteFavoriteMutation.mutate(id);
    } else {
      addFavoriteMutation.mutate({
        title,
        link,
        description,
        id,
      });
    }
  }, [isFavorite]);

  return (
    <TouchableOpacity onPress={handleToggleStarPress}>
      <AntDesign name={isFavorite ? "star" : "staro"} size={24} color="black" />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
