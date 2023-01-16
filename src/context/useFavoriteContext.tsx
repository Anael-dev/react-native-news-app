import { useContext } from "react";

import { FavoritesContext, FavoritesContextValue } from "./FavoritesContext";

export const useFavoritesContext = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("Context must be used within a Provider");
  return context;
};
