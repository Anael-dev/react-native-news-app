import axios from "axios";
import { NEWS_API_ENTRY_POINT, NEWS_API_KEY_VALUE } from "react-native-dotenv";
import { NewsResponseType } from "../screens/NewsHub";

export async function fetchNewsAction(query: string, category: string) {
  try {
    const { data } = await axios.get<Promise<NewsResponseType>>(
      `${NEWS_API_ENTRY_POINT}/top-headlines?q=${query}&category=${category}&apiKey=${NEWS_API_KEY_VALUE}`
    );
    return data;
  } catch (err) {
    console.log("err", err);
  }
}

export default fetchNewsAction;
