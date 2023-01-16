import SalesforceApi from "./SalesforceApi";

export type InsertArgs = {
  title: string;
  link: string;
  description?: string | null;
  id: string;
};

export async function getAllFavorites() {
  try {
    const { data } = await SalesforceApi.get(
      `/services/apexrest/favorite_article`
    );
    //remove logs
    console.log("getAllFavorites: ", data?.result);
    return data?.result;
  } catch (err) {
    console.log("getAllFavorites error", err);
  }
}

export async function insertFavorite(insertData: InsertArgs) {
  try {
    const { data } = await SalesforceApi.post(
      `/services/apexrest/favorite_article`,
      insertData
    );
    //remove logs
    console.log("insertFavorite: ", data);
    return data;
  } catch (err) {
    console.log("insertFavorite error", err);
    return;
  }
}

export async function deleteFavorite(articleId: string) {
  try {
    const { data } = await SalesforceApi.delete(
      `/services/apexrest/favorite_article/${articleId}`
    );
    //remove logs
    console.log("deleteFavorite: ", data);
    return data;
  } catch (err) {
    console.log("deleteFavorite error", err);
    return;
  }
}

export default { insertFavorite, deleteFavorite, getAllFavorites };
