import * as SecureStore from "expo-secure-store";

type GetUserCradentialsResponse = {
  token: string | null;
  baseUrl: string | null;
};

export async function storeUserCradentials(token: string, baseUrl: string) {
  try {
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("baseUrl", baseUrl);
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function getUserCradentials(): Promise<
  GetUserCradentialsResponse | undefined
> {
  try {
    const token = await SecureStore.getItemAsync("token");
    const baseUrl = await SecureStore.getItemAsync("baseUrl");
    return { token, baseUrl };
  } catch (error) {
    console.log("error: ", error);
  }
}
