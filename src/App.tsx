import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { StatusBar } from "react-native";

import Navigator from "./components/Navigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar animated />
        <Navigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
