// import conf from "../conf"; /* LOCATION TO .ENV FILE / .ENV IMPORT FILE */
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(/* APPWRITE ENDPOINT URL FROM .ENV FILE */)
      .setProject(/* APPWRITE PROJECT ID FROM .ENV FILE */);

    this.account = new Account(this.client);
  }

  async signup(email, password) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password
      );
      if (user) {
        // login user;
        return this.login(email, password);
      }
      return null;
    } catch (error) {
      throw error;
      //   console.log("appwrite :: auth :: signup :: error", error);
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
      //   console.log("appwrite :: auth :: signup :: error", error);
    }
  }
  async getUserInfo() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
      //   console.log("appwrite :: auth :: signup :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
