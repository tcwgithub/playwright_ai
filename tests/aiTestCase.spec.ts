import { test, expect } from '@playwright/test';
import { initializeFetch, getGeneratedTestCase, ApiResponse } from '../common/aiTestCaseGenerator'; // Ensure the correct path

let generatedText: ApiResponse[] | null = null;

test.beforeAll(async () => {
  await initializeFetch(); // Dynamically import fetch
});

test('should generate a test case from user story', async () => {
  const userStory = 'As a user, I want to log in so that I can access my account.';
  
  try {
    generatedText = await getGeneratedTestCase(userStory);
    console.log('Generated Text:', generatedText);  // Log the output
    
    if (generatedText) {
      console.log('Generated Test Case:', generatedText[0]?.generated_text || 'No text generated');
    }
  } catch (error) {
    console.error('Error occurred while fetching generated test case:', error);
  }

  // Example assertion
  expect(generatedText).not.toBeNull();
});
