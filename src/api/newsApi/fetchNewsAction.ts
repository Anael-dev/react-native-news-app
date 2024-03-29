import axios from "axios";
import { NEWS_API_KEY } from "react-native-dotenv";
import uuid from "react-native-uuid";
import { Article } from "../../screens/NewsHub/NewsItem";

export async function fetchNewsAction(query: string, category: string) {
  try {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${query}&category=${category}&apiKey=${NEWS_API_KEY}`
    );
    return data.articles.map((item: Article) => ({
      ...item,
      // need to add manually uniqe id field
      id: uuid.v4(),
    }));
  } catch (err) {
    console.log("fetchNewsAction error", err);
  }
}

export default fetchNewsAction;
