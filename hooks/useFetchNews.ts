import axios from "axios";
import { NEWS_API_ENTRY_POINT, NEWS_API_KEY } from "react-native-dotenv";

export async function fetchNewsAction(query: string, category: string) {
  try {
    const { data } = await axios.get(
      `${NEWS_API_ENTRY_POINT}/top-headlines?q=${query}&category=${category}&apiKey=${NEWS_API_KEY}`
    );
    return data;
  } catch (err) {
    console.log("err");
    return [];
  }
}

export default fetchNewsAction;
