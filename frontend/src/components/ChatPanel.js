import React, { useState } from "react";

const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    // Add user message
    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);

    try {
      const res = await fetch("https://ai-crm-hcp-jmj4.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Add bot response
      setChat([
        ...newChat,
        {
          role: "bot",
          text: data.response || JSON.stringify(data),
        },
      ]);
    } catch (error) {
      setChat([
        ...newChat,
        { role: "bot", text: "Error connecting to backend" },
      ]);
    }

    setMessage("");
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>AI Assistant</h3>

      {/* Chat Messages */}
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                background:
                  msg.role === "user" ? "#007bff" : "#f1f1f1",
                color: msg.role === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "10px",
                display: "inline-block",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Describe Interaction..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%", padding: "8px" }}
      />

      <button onClick={sendMessage} style={{ padding: "8px 12px" }}>
        Send
      </button>
    </div>
  );
};

export default ChatPanel;