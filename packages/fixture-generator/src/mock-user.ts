import { User } from "./types";
class MockUser {
  user: User;

  constructor() {
    this.user = {};
  }

  get() {
    return this.user;
  }
}

export default MockUser;
