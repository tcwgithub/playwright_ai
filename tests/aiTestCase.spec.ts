// aiTestCase.spec.ts

import { test, expect } from '@playwright/test';
import { getGeneratedTestCase } from '../common/aiTestCaseGenerator';  // Path to your aiTestCaseGenerator.ts

test('should generate a valid test case from the user story', async () => {
  const userStory = 'As a user, I want to log in to my account on the website with a valid username and password so I can access my profile.';
  const generatedTestCase = await getGeneratedTestCase(userStory);

  // Ensure that the generated text exists
  expect(generatedTestCase).not.toBeNull();

  if (generatedTestCase) {
    const generatedText = generatedTestCase[0]?.generated_text;
    console.log('Generated Text:', generatedText);

    // Validate that the generated text contains expected test case details
    expect(generatedText).toContain('Test steps');
    expect(generatedText).toContain('Expected results');
  }
});
