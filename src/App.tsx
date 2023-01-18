import { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { registerRootComponent } from "expo";

import Navigator from "./components/Navigator";
import fetchAccsessToken from "./api/salesforceAuth/fetchAccessToken";
import { FavoritesContextProvider } from "./context/FavoritesContext";
import { storeUserCradentials } from "./utils";

const queryClient = new QueryClient();

function App() {
  const initializeUserSession = useCallback(async (): Promise<void> => {
    const response = await fetchAccsessToken();
    if (response) {
      storeUserCradentials(response.access_token, response.instance_url);
    }
  }, [fetchAccsessToken]);

  useEffect(() => {
    initializeUserSession();
  }, [initializeUserSession]);

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

export default registerRootComponent(App);
