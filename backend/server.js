require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-recipe', async (req, res) => {
    const { dietChoice, budget, dietRestrictions, dietGoal } = req.body;

    console.log("Received data:", req.body); // Logs data in the backend console

    res.json({
        message: "Received user preferences successfully!",
        data: {
            dietChoice,
            budget,
            dietRestrictions,
            dietGoal,
        },
    });
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
