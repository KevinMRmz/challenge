import axios from "axios";
import { ACCOUNT_URI } from "./account-constants";

export class AccountService {
  async getAccounts() {
    const { data } = await axios.get(ACCOUNT_URI, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return data;
  }

  async createAccount(account) {
    const { data } = await axios.post(
      ACCOUNT_URI,
      { ...account },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return data;
  }

  async updateAccount(account, id) {
    const { data } = await axios.patch(
      ACCOUNT_URI + id,
      { ...account },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return data;
  }

  async deleteAccount(id) {
    const { data } = await axios.delete(ACCOUNT_URI + id, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return data;
  }
}
