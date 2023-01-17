import { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import Navigator from "./components/Navigator";
import fetchAccsessToken from "./api/salesforceAuth/fetchAccessToken";
import { FavoritesContextProvider } from "./context/FavoritesContext";

const queryClient = new QueryClient();

export default function App() {
  const setUserCradentials = useCallback(async (): Promise<void> => {
    const response = await fetchAccsessToken();
    if (response) {
      await AsyncStorage.setItem("access_token", response.access_token);
      await AsyncStorage.setItem("instance_url", response.instance_url);
    }
  }, [fetchAccsessToken]);

  useEffect(() => {
    setUserCradentials();
  }, [setUserCradentials]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar animated />
        <FavoritesContextProvider>
          <Navigator />
          <Toast position="bottom" />
        </FavoritesContextProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
