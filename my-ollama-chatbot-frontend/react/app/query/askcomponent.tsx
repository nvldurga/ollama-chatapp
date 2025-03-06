import React, { useState } from 'react';
import axios from 'axios';

const AskComponent: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8009/ask', { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit">Ask</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default AskComponent;