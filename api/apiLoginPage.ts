import { APIRequestContext } from '@playwright/test';
import ENV from '../common/env';

export class LoginPageAPI {
  private request: APIRequestContext;
  private baseUrl: string;
  private endPoint: string;

  constructor(request: APIRequestContext) {
    this.request = request;

    // Use API-specific base URL and endpoint
    this.baseUrl = ENV.API_BASE_URL || '';
    this.endPoint = ENV.API_END_POINT || '';

    if (!this.baseUrl || !this.endPoint) {
      console.error('API Base URL or Endpoint is not set in ENV.');
      throw new Error('API Base URL or Endpoint is missing.');
    }
  }

  // Authenticate using API and get a token
  async authenticate(username?: string, password?: string): Promise<{ token: string; statusCode: number }> {
    const url = `${this.baseUrl}/auth/login`; // Assuming this is the login endpoint
    console.log(`Auth URL: ${url}`);

    const apiUsername = username ?? ENV.API_LOGINUSER;
    const apiPassword = password ?? ENV.API_PASSWORD;

    if (!apiUsername || !apiPassword) {
      throw new Error('API Username or Password is missing in ENV.');
    }

    // Sending POST request to authenticate
    const response = await this.request.post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: apiUsername,
        password: apiPassword,
      },
    });

    const responseBody = await response.json();
    console.log('Login Response Body:', responseBody);

    const statusCode = response.status();
    if (response.ok() && responseBody.accessToken) {
      console.log(`Auth Success - Status: ${statusCode}`);
      return { token: responseBody.accessToken, statusCode };
    } else {
      console.error(`Auth Failed - Status: ${statusCode}`);
      throw new Error(`Auth Failed: ${responseBody.message || 'Unknown error'}`);
    }
  }

  // Fetch login status
  async getLoginStatus(): Promise<number> {
    const url = `${this.baseUrl}${this.endPoint}`;
    console.log(`Fetching login status from URL: ${url}`);

    const response = await this.request.get(url);

    const statusCode = response.status();
    if (!response.ok()) {
      console.error(`Error fetching login status: ${statusCode} - ${await response.text()}`);
    } else {
      console.log(`Login status fetched successfully: ${statusCode}`);
    }
    return statusCode;
  }
}
