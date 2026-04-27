import axios from "axios";
import { useState } from "react";

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input
      });
      setReply(res.data.reply);
    } catch {
      setReply("Error connecting to backend");
    }
  };

  return (
    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">
        <h3>AI Assistant</h3>
        <p>Log Interaction via chat</p>
      </div>

      {/* Chat Display Box */}
      <div className="chat-box">
        {reply ? (
          <p>{reply}</p>
        ) : (
          <p className="placeholder">
            Log interaction details here (e.g. “Met Dr. Smith discussed product…”)
          </p>
        )}
      </div>

      {/* Input Bar */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Describe Interaction..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={sendMessage}>Log</button>
      </div>

    </div>
  );
}