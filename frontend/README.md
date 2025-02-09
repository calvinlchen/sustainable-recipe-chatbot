# 🌱 Sustainable Recipe Generator  

This project was made by **Calvin Chen, Roger Chen, Johann Nino de Espino, and Reyan Shariff** for **HackDuke 2025**.  

It was originally forked from the **PDF RAG web app** starter code provided by HackDuke staff. Special acknowledgements to HackDuke for running the hackathon and providing starter code.

---

## 📌 Overview  

The **Sustainable Recipe Generator** is a web application that generates **eco-friendly recipes** based on user preferences.  

Users can specify:  
- **Dietary choices** (Vegan, Keto, etc.)  
- **Budget constraints** (Low, Medium, High)  
- **Dietary restrictions** (Gluten-free, Halal, etc.)  
- **Health goals** (Weight loss, Muscle gain, etc.)  

The app then generates **three recipes** that reuse ingredients to minimize **food waste**, prioritizing **seasonal, locally sourced ingredients**.  

---

## 🚀 Installation  

Before running the project, ensure you have:  
✅ **Node.js** installed ([Download Here](https://nodejs.org/))  
✅ **npm (Node Package Manager)** installed 

## Installing Dependencies
```sh
cd frontend
npm install
cd ../backend
npm install
```
## How to Run
Start the backend server
```
cd backend
node server.js
```
The backend will run at http://localhost:5001

Then start the frontend
```
cd frontend
npm start
```
Open http://localhost:3000 in your browser.
The page will automatically reload when you make changes.

## Environment Variables (.env)
Create a .env file inside the backend directory and add:

```
OPENAI_API_KEY=your-api-key-here
```
