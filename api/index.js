const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyCUPwgNRZSqV8GZ_mdJMn1zF5tuhqyCuso';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

app.post('/api/repurpose', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const prompt = `
    Transform this content into different formats:
    Original Content: "${content}"
    
    Please provide:
    1. Twitter Thread (3-5 tweets)
    2. LinkedIn Post (professional tone)
    3. Instagram Caption (engaging, with hashtags)
    4. Newsletter Draft (formal tone)
    
    Format each section clearly with headers.
    `;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    const sections = generatedText.split(/(?=Twitter Thread:|LinkedIn Post:|Instagram Caption:|Newsletter Draft:)/);
    const formatted = {
      twitter: sections.find(s => s.includes('Twitter Thread:'))?.replace('Twitter Thread:', '').trim() || '',
      linkedin: sections.find(s => s.includes('LinkedIn Post:'))?.replace('LinkedIn Post:', '').trim() || '',
      instagram: sections.find(s => s.includes('Instagram Caption:'))?.replace('Instagram Caption:', '').trim() || '',
      newsletter: sections.find(s => s.includes('Newsletter Draft:'))?.replace('Newsletter Draft:', '').trim() || ''
    };

    res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
