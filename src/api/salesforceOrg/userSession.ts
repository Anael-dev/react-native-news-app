import * as SecureStore from "expo-secure-store";

import OrgApi from "./OrgApi";

export async function createUserSession() {
  try {
    const { data } = await OrgApi.post(`/services/apexrest/user_session`);
    if (data?.result?.sessionId) {
      await SecureStore.setItemAsync("sessionId", data.result.sessionId);
    }
    //remove logs
    console.log("createUserSession: ", data);
    return data;
  } catch (err) {
    console.log("createUserSession error", err);
    return;
  }
}
