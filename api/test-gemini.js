const axios = require('axios');

async function testGeminiAPI() {
  console.log("Testing Gemini API connection...");
  
  const API_KEY = 'AIzaSyCUPwgNRZSqV8GZ_mdJMn1zF5tuhqyCuso';
  const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
  
  try {
    // First, let's try to list available models
    const modelsResponse = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models`,
      { params: { key: API_KEY } }
    );
    
    console.log("Available models:", JSON.stringify(modelsResponse.data, null, 2));

    // Now let's try to generate content
    const response = await axios.post(
      API_ENDPOINT,
      {
        contents: [{
          parts: [{
            text: "Write a short hello world message."
          }]
        }]
      },
      {
        params: { key: API_KEY },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("API Response:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
  }
}

testGeminiAPI();
