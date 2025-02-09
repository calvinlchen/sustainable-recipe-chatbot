// server/index.js
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');
const cors = require('cors');

const pool = require('./db/database'); // Import DB connection

const app = express();
const upload = multer();
const port = process.env.PORT || 5000;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Get your API key from OpenAI dashboard
});

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Database connected', time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Example route: Get all recipes from table
app.get('/api/recipes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const data = await pdfParse(req.file.buffer);
        res.json({ text: data.text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse PDF' });
    }
});

app.post('/ask', async (req, res) => {
    const { question, pdfText } = req.body;
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: `${pdfText}\n\nQ: ${question}\nA:` }],
            store: true,
            stream: true,
        });

        let answer = '';
        for await (const chunk of stream) {
            answer += chunk.choices[0]?.delta?.content || "";
        }

        res.json({ answer });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
