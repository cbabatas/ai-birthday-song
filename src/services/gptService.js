const axios = require('axios');

const generateLyrics = async ({ name, relationship, traits, tone, style }) => {
  const prompt = `
You are a creative songwriter AI. Write a short birthday song in rhyming lyrics for someone.

Recipient Name: ${name}
Relationship: ${relationship}
Traits: ${traits.join(', ')}
Tone: ${tone}
Style: ${style}

Keep the song 4 short verses (under 100 words). Include a catchy chorus. Make sure it matches the tone and style.
`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return response.data.choices[0].message.content.trim();
};

module.exports = generateLyrics;
