require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateContent(inputContent) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent([
      "Transform this content into multiple formats. Return only valid JSON in the specified format, no other text.",
      `Original content: "${inputContent}"`,
      `Required JSON format:
      {
        "tweetThread": ["tweet1", "tweet2"],
        "linkedinPost": "post",
        "instagramCaption": "caption",
        "newsletter": "newsletter"
      }`
    ]);

    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      return {
        error: "Failed to parse response",
        rawResponse: text
      };
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

module.exports = { generateContent };
