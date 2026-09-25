import { APIRequestContext, expect } from "@playwright/test";

export class ApiClient {
  constructor(protected request: APIRequestContext) {}

  protected async validateStatus(response: any, expectedStatus: number) {
    expect(
      response.status(),
      `Expected status ${expectedStatus} but got ${response.status()}`,
    ).toBe(expectedStatus);
    return response;
  }
}