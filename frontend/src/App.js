import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [pdfText, setPdfText] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

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

    return (
        <div className="App">
            <h1>PDF Q&A</h1>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            <div>
                <h2>Extracted Text</h2>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {pdfText}
                </pre>
            </div>
            <div>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question"
                />
                <button onClick={handleAskQuestion}>Ask</button>
            </div>
            {answer && (
                <div>
                    <strong>Answer:</strong> {answer}
                </div>
            )}
        </div>
    );
}

export default App;
