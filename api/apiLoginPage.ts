import { APIRequestContext } from '@playwright/test';
import ENV from '../common/env';
import { promises as fs } from 'fs';
import path from 'path';

export class LoginPageAPI {
  private request: APIRequestContext;
  private baseUrl: string;
  private endPoint: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = ENV.API_BASE_URL || '';
    this.endPoint = ENV.API_END_POINT || '';

    if (!this.baseUrl || !this.endPoint) {
      console.error('API Base URL or Endpoint is not set in ENV.');
      throw new Error('API Base URL or Endpoint missing.');
    }
  }

  // Save data to a file
  private async saveToFile(filePath: string, data: object): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true }); // Create the directory if it doesn't exist
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Data Saved ${filePath}`);
    } catch (error) {
      console.error('Unable to Save File :', error);
      throw error;
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
    const dataToSave = {
      username: apiUsername,
      password: apiPassword,
      statusCode,
      responseBody,
    };

    if (response.ok() && responseBody.accessToken) {
      console.log(`Auth Success - Status: ${statusCode}`);

      // Save all relevant data to the file
      const filePath = path.join(__dirname, '../testData/apiLoginData.json');
      await this.saveToFile(filePath, { ...dataToSave,  });

      return { token: responseBody.accessToken, statusCode };
    } else {
      console.error(`Auth Failed - Status: ${statusCode}`);
      await this.saveToFile(
        path.join(__dirname, '../testData/apiLoginData.json'),
        { ...dataToSave, errorMessage: responseBody.message || 'Unknown Error' }
      );
      throw new Error(`Auth Failed: ${responseBody.message || 'Unknown Error'}`);
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
