import { test, expect } from "@playwright/test";
import { AuthApi } from "../../src/api/auth.api";

test.describe("API Smoke Suite", () => {
  test("POST /login: Admin can retrieve valid JWT token", async ({
    request,
  }) => {
    const authApi = new AuthApi(request);

    const responseBody = await authApi.login({
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    });

    expect(responseBody).toHaveProperty("token");
    expect(typeof responseBody.token).toBe("string");
  });

  test("GET /users: Admin can fetch user list with valid token", async ({
    request,
  }) => {
    const authApi = new AuthApi(request);
    const { token } = await authApi.login({
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    });

    const usersResponse = await request.get("/users?page=1&limit=10", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(usersResponse.status()).toBe(200);
    const body = await usersResponse.json();
    
    const list = Array.isArray(body)
      ? body
      : body.users || body.data || body.items || [];

    expect(Array.isArray(list)).toBeTruthy();
  });
});
