import * as SecureStore from "expo-secure-store";

import OrgApi from "./OrgApi";

type InsertArgs = {
  title: string;
  link: string;
  id: string;
};

export async function addArticleToUserSession(insertData: InsertArgs) {
  try {
    const sessionId = await SecureStore.getItemAsync("sessionId");
    const body = { ...insertData, sessionId };
    const { data } = await OrgApi.post(
      `/services/apexrest/user_session_article`,
      body
    );
    //remove logs
    console.log("addArticleToUserSession: ", data);
    return data;
  } catch (err) {
    console.log("addArticleToUserSession error", err);
    return;
  }
}