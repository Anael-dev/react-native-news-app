import React, { createContext } from "react";
import { useQuery } from "react-query";

import { getAllFavorites } from "../api/salesforceOrg/favoritesActions";

export type FavoritesContextValue = {
  favorites: Favorite;
};

type Favorite = {
  [articleId: string]: number;
};

type ContextProps = {
  children: JSX.Element[] | JSX.Element;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);

export const FavoritesContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const { data } = useQuery(["favorites"], getAllFavorites);

  return (
    <FavoritesContext.Provider value={{ favorites: data }}>
      {children}
    </FavoritesContext.Provider>
  );
};
