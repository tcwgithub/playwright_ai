import { APIResponse as PlaywrightAPIResponse, expect } from '@playwright/test';

export class APIResponse {
  static async validateResponse(response: PlaywrightAPIResponse, expectedStatus: number) {
    const status = response.status();
    console.log(`Validating response: ${status}`);
    expect(status).toBe(expectedStatus);

    const responseBody = await response.json();
    console.log(`Response Body: ${JSON.stringify(responseBody)}`);
    return responseBody;
  }
}
