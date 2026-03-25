import axios from "axios";
import type { AxiosInstance } from "axios";
import type { UserRegistrationInput, User } from "~/shared/user.types";

class UserGateway {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  getAll = async () => {
    return this.api.get<User[]>("/users");
  };

  register = async (input: UserRegistrationInput) => {
    const data = {
      username: input.userName,
      email: input.email,
      last_name: input.lastName,
      first_name: input.firstName,
      password: input.password,
    };

    return this.api.post("/users/new", data);
  };
}

export const userGateway = new UserGateway();
