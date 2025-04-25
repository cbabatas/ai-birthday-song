const axios = require('axios');

const generateVoice = async (lyrics) => {
  const response = await axios.post(
    'https://api.uberduck.ai/speak',
    {
      speech: lyrics,
      voice: 'rap_guy'
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UBERDUCK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.path;
};

module.exports = generateVoice;
