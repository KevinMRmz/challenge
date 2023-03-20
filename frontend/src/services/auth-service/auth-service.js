import axios from "axios";
import { LOGIN_URI } from "./auth-constants";

export class AuthService {
  async signIn(email, password) {
    const { data } = await axios.post(LOGIN_URI, {
      email,
      password,
    });

    return data;
  }

  async signOut() {}
}
