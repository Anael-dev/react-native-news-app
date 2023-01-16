import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";

import { getAllFavorites } from "../api/salesforceOrg/favoritesActions";

export type FavoritesContextValue = {
  favorites: Favorite;
};

type Favorite = {
  [articleId: string]: FavoriteValues;
};

interface FavoriteValues {
  Id: string;
  Title__c: string;
  Link__c: string;
  Article_Id__c: string;
}

type ContextProps = {
  children: JSX.Element[] | JSX.Element;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);

export const FavoritesContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const { data, refetch, isLoading, isFetching } = useQuery(
    ["favorites"],
    getAllFavorites
  );

  return (
    <FavoritesContext.Provider value={{ favorites: data }}>
      {children}
    </FavoritesContext.Provider>
  );
};
