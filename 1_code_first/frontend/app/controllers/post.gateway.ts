import axios from "axios";
import type { AxiosInstance } from "axios";
import type { ApiResponse } from "~/shared";
import type { PostWithDetails } from "~/shared/post.types";

class PostGateway {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getRecentPosts = async () => {
    return this.api.get<ApiResponse<PostWithDetails[]>>("/posts/all");
  };
}

export const postGateway = new PostGateway();
