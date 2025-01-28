export type ApiResponse = {
  generated_text: string;
};

// Dynamically import node-fetch when needed
let fetch: any;

// Function to initialize fetch dynamically
export const initializeFetch = async () => {
  if (!fetch) {
    fetch = (await import('node-fetch')).default; // Import fetch dynamically
  }
};

// Function to generate test case from the user story
export const getGeneratedTestCase = async (userStory: string): Promise<ApiResponse[] | null> => {
  const url = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B';  // Update the model name
  const headers = {
    'Authorization': `Bearer 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`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ inputs: userStory });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse response as ApiResponse[]
    const data = (await response.json()) as ApiResponse[];

    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
