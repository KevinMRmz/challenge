import axios from "axios";
import { USERS_URI, USERS_TEAM_URI } from "./user-constants";

export class UserService {
  async getUsers() {
    const { data } = await axios.get(USERS_URI, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });

    return data;
  }

  async getUsersForTeam(id) {
    const { data } = await axios.get(USERS_TEAM_URI + id, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });

    return data;
  }

  async createUser(user) {
    const { data } = await axios.post(USERS_URI, user, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });

    return data;
  }
}
