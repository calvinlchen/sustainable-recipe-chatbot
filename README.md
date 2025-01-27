# PDF Question Helper: A Beginner's Project

Welcome to **PDF Question Helper**, a simple app that allows users to upload a PDF, extract its text, and ask questions about the document using ChatGPT! This project is designed to help beginners learn how to integrate front-end, back-end, and third-party APIs.

---

## ✨ Features

- Upload a PDF file to extract its text content.
- Ask ChatGPT questions about the PDF's content.
- Simple React frontend and Express backend setup.
- Integration with `pdf-parse` and OpenAI API.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Basic knowledge of JavaScript, React, and Express.js.
- OpenAI API key (sign up at [OpenAI](https://platform.openai.com/signup)).

---

## 📂 Project Structure

```plaintext
pdf-question-helper/
├── client/       # React Frontend
└── server/       # Express Backend
```

---

## 🚀 How to Run the Project

### 1. Setting Up the React Frontend

1. **Create a React app**:
   ```bash
   npx create-react-app client
   ```
2. Navigate to the project folder:
   ```bash
   cd client
   ```
3. Install Axios for making API requests:
   ```bash
   npm install axios
   ```
4. Replace your `App.js` file with the following snippet for file upload and question-asking functionality:

   ```javascript
   const handleFileUpload = async (event) => {
       const file = event.target.files[0];
       const formData = new FormData();
       formData.append('file', file);

       try {
           const response = await axios.post('http://localhost:5001/upload', formData, {
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
           });
           setPdfText(response.data.text);
       } catch (error) {
           console.error('Error uploading file:', error);
       }
   };

   const handleAskQuestion = async () => {
       try {
           const response = await axios.post('http://localhost:5001/ask', {
               question,
               pdfText
           });
           setAnswer(response.data.answer);
       } catch (error) {
           console.error('Error asking question:', error);
       }
   };
   ```

5. Start the frontend:
   ```bash
   npm start
   ```

---

### 2. Setting Up the Express Backend

1. Navigate back to the root directory and create the server folder:
   ```bash
   mkdir server && cd server
   ```
2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```
3. Install dependencies:
   ```bash
   npm install express multer pdf-parse openai
   ```
4. Create a file `index.js` and add the following code for handling PDF uploads and ChatGPT integration:

   ```javascript
   const express = require('express');
   const multer = require('multer');
   const pdfParse = require('pdf-parse');
   const { OpenAI } = require('openai');

   const app = express();
   const upload = multer();
   const openai = new OpenAI('YOUR_OPENAI_API_KEY');

   app.use(express.json());

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

   app.listen(5001, () => console.log('Server running on http://localhost:5001'));
   ```

5. Start the backend:
   ```bash
   node index.js
   ```

---

## 💡 How It Works

### 1. Upload PDF
When a user uploads a PDF file, the backend processes it with `pdf-parse` to extract the text content.

**Backend Code**:
```javascript
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const data = await pdfParse(req.file.buffer);
        res.json({ text: data.text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse PDF' });
    }
});
```

### 2. Ask a Question
The user asks a question about the PDF's content, which is sent to the OpenAI API to generate a response.

**Backend Code**:
```javascript
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
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});
```

---

## 📝 Notes for Beginners

1. **Creating a React App**: Use `npx create-react-app <app-name>` to quickly bootstrap a React project.
2. **Backend and Frontend Communication**: Use Axios to send HTTP requests between React and Express.
3. **API Integration**: Learn how to integrate third-party libraries like `pdf-parse` and APIs like OpenAI.
4. **Error Handling**: Always include try-catch blocks to manage errors gracefully.

---

Enjoy building your project! 😊
