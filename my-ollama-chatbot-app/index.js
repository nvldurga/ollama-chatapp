// filepath: /Users/nvldurgab/Documents/my-ollama-chatbot-app/index.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    accessControlAllowOrigin: 'http://localhost:5173'
  }));

  // Handle preflight requests
app.options('/ask', cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    accessControlAllowOrigin: 'http://localhost:5174'
  }));
app.get('/', (req, res) => {
    res.send("Hello");
});


app.post("/ask", async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3", // Change this if using another model
        prompt: prompt,
        stream: false,
      });
  
      res.json({ response: response.data.response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
app.listen(8009,()=> {
    console.log("Server running");
})