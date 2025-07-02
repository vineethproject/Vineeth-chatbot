import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatBoxRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not get response.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="main-bg">
      <nav className="navbar">
        <div className="nav-logo">Ollama Chatbot</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="https://ollama.com" target="_blank" rel="noopener noreferrer">Ollama</a>
        </div>
      </nav>
      <div className="hero">
        <h1>Chat with AI, Locally & Privately</h1>
        <p>Powered by Ollama LLMs. Your data never leaves your device.</p>
      </div>
      <div className="chat-section">
        <div className="chat-container">
          <div className="chat-box" ref={chatBoxRef}>
            {messages.length === 0 && !loading && (
              <div className="empty-chat">Start the conversation!</div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === 'user' ? 'user-msg' : 'bot-msg'}>
                {msg.role === 'user' ? <span className="avatar user-avatar">🧑</span> : <span className="avatar bot-avatar">🤖</span>}
                <span className="msg-content">{msg.content}</span>
              </div>
            ))}
            {loading && <div className="bot-msg"><span className="avatar bot-avatar">🤖</span> <span className="msg-content">...</span></div>}
          </div>
          <div className="input-row">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
        <div className="sidebar">
          <h2 id="features">Features</h2>
          <ul>
            <li>⚡ Fast, local LLM responses</li>
            <li>🔒 100% private (runs on your device)</li>
            <li>🧑‍💻 Modern, responsive UI</li>
            <li>🤖 Supports any Ollama model</li>
            <li>🌙 Auto-scroll, avatars, and more</li>
          </ul>
          <h2 id="about">About</h2>
          <p>This chatbot runs entirely on your computer using Ollama and open-source LLMs. No cloud, no tracking, just pure AI chat.</p>
        </div>
      </div>
      <footer>
        <span>Made with ❤️ using FastAPI, React, and Ollama</span>
      </footer>
    </div>
  )
}

export default App
