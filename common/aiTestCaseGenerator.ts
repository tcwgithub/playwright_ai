// aiTestCaseGenerator.ts

export type ApiResponse = {
  generated_text: string;  // This will hold the generated text from the AI model
};

let fetch: any;

// Function to initialize fetch dynamically
export const initializeFetch = async () => {
  if (!fetch) {
    fetch = (await import('node-fetch')).default;
  }
};

// Function to generate test case from the user story
export const getGeneratedTestCase = async (userStory: string): Promise<ApiResponse[] | null> => {
  const url = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B';  // AI model endpoint
  const headers = {
    'Authorization': `Bearer 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`,  // Hugging Face API key
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    inputs: `${userStory} Generate a simple test case for logging in to a website, including test steps, expected results.`
  });

  try {
    await initializeFetch();
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the response as an object
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Expected an array but got something else.');
    }

    // If data is an array of objects with 'generated_text', format it accordingly
    const structuredTestCase: ApiResponse[] = data.map((item: { generated_text: string }) => ({
      generated_text: item.generated_text.trim(),
    }));

    console.log('Generated Test Case:', structuredTestCase);
    return structuredTestCase;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};
