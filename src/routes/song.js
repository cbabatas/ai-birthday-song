const express = require('express');
const router = express.Router();
const generateLyrics = require('../services/gptService');
const generateVoice = require('../services/uberService');

router.post('/', async (req, res) => {
  try {
    const { name, relationship, traits, tone, style } = req.body;
    const lyrics = await generateLyrics({ name, relationship, traits, tone, style });
    const audioUrl = await generateVoice(lyrics);
    res.json({ lyrics, audioUrl });
  } catch (error) {
    console.error('Error generating song:', error.message);
    res.status(500).json({ error: 'Failed to generate birthday song' });
  }
});

module.exports = router;
