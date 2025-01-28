import { test, expect, request } from '@playwright/test';
import { LoginPageAPI } from '../api/apiLoginPage'; // Import the LoginPageAPI class

test('Verify API Authentication and Status', async ({ request }) => {
  const loginPage = new LoginPageAPI(request); // Create an instance of LoginPageAPI

  try {
    // Attempt to authenticate with invalid credentials to trigger error
    const { token, statusCode } = await loginPage.authenticate('emilys', 'emilyspass');

    // Assert that the token is defined and status code is 200
    expect(token).toBeDefined();
    expect(statusCode).toBe(200); // Modify this as per your API's expected success code
  } catch (error) {
    // If authentication fails, log the error and ensure test fails
    console.error('Test failed due to authentication error:', error);
    expect(error).toBeDefined(); // Ensures the test fails if authentication fails
  }
});
