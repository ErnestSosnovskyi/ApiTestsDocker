import { APIRequestContext } from "@playwright/test";
import { ApiClient } from "./apiClient";

export class AuthApi extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async login(credentials: Record<string, string>) {
    const response = await this.request.post("/login", { data: credentials });
    await this.validateStatus(response, 200);
    return response.json();
  }
}