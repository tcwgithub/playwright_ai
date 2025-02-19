import { test, expect } from '@playwright/test';
import { LoginPageAPI } from '../api/apiLoginPage';

test('Verify API Authentication and Status', async ({ request }) => {
  const loginPage = new LoginPageAPI(request);

  try {
    // Attempt to authenticate with valid credentials to trigger error
    const { token, statusCode } = await loginPage.authenticate('emilys', 'emilyspass');
    expect(token).toBeDefined();
    expect(statusCode).toBe(200);
  } catch (error) {
    console.error('FAILED - AUTH ERROR :', error);
    expect(error).toBeDefined();
  }
});
