import axios from "axios";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  PASSWORD,
  USERNAME,
} from "react-native-dotenv";
import qs from "qs";

interface TokenResonseType {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

const params = {
  grant_type: "password",
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  username: USERNAME,
  password: PASSWORD,
};

const config = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
};

export async function fetchAccsessToken() {
  try {
    const { data } = await axios.post<
      Promise<TokenResonseType | undefined>
    >(
      "https://login.salesforce.com/services/oauth2/token",
      qs.stringify(params),
      config
    );
    return data;
  } catch (err) {
    console.log("fetchAccsessToken error", err);
    return;
  }
}

export default fetchAccsessToken;
