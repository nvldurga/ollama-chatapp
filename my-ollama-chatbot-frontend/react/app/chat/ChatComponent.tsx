import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatComponent: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = { sender: 'user', text: prompt };
    setMessages((prev) => [userMessage,...prev]);
    setPrompt('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8009/ask', { prompt });
      const botMessage: Message = { sender: 'bot', text: res.data.response };
      setMessages((prev) => [botMessage,...prev]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { sender: 'bot', text: 'An error occurred' };
      setMessages((prev) => [errorMessage,...prev]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-screen w-full  text-black">
      <div className="w-3/10 flex items-center justify-center">
        <img src="../../public/images/chat-guru.jpg" alt="Chat Image" className="max-w-full h-auto" />
      </div>
      <div className="w-7/10 flex flex-col">
        <header className="p-4 bg-pink-500 text-white text-left">
          <h1 className="text-xl font-bold">Let's Talk</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse bg-pink-100">
          <div ref={messagesEndRef} />
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg text-white ${message.sender === 'user' ? 'bg-blue-500 text-right w-2/5 self-end' : 'bg-gray-500 text-left w-3/5 self-start'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex p-4 bg-white border-t">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <button
            type="submit"
            className={`ml-2 px-4 py-2 rounded-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default ChatComponent;