import OrgApi from "./OrgApi";

type InsertArgs = {
  title: string;
  link: string;
  id: string;
};

export async function insertUserReview(insertData: InsertArgs) {
  try {
    const { data } = await OrgApi.post(
      `/services/apexrest/user_session`,
      insertData
    );
    //remove logs
    console.log("insertUserReview: ", data);
    return data;
  } catch (err) {
    console.log("insertUserReview error", err);
    return;
  }
}

export default insertUserReview;
