import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import Toast from "react-native-toast-message";

import {
  deleteFavorite,
  InsertArgs,
  insertFavorite,
} from "../../api/salesforceOrg/favoritesActions";
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["favorites"] });
      Toast.show({
        type: "success",
        text1: "Added to your Favorties :)",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Houston, we have a problem",
      });
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["favorites"] });
      Toast.show({
        type: "success",
        text1: "Removed from your Favorites :)",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Houston, we have a problem",
      });
    },
  });

  const isFavorite = useMemo(() => !!favorites?.[id], [favorites]);

  const handleToggleStarPress = useCallback(() => {
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
