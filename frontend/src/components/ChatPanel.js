import React, { useState } from "react";

const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("https://ai-crm-hcp-jmj4.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response || JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>AI Assistant</h3>

      <textarea
        placeholder="Describe interaction..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", height: "80px" }}
      />

      <button onClick={sendMessage}>Log</button>

      <div style={{ marginTop: "10px" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatPanel;