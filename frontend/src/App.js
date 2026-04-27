import "./App.css";
import ChatPanel from "./components/ChatPanel";

function App() {
  return (
    <div style={{ display: "flex", padding: 20, fontFamily: "Inter" }}>
      
      {/* LEFT SIDE */}
      <div style={{ width: "65%", paddingRight: 20 }}>
        <h2>Log HCP Interaction</h2>

        <div className="card">

          {/* HCP + Interaction */}
          <div className="row">
            <input placeholder="HCP Name" />
            <select>
              <option>Interaction Type</option>
              <option>Meeting</option>
              <option>Call</option>
              <option>Email</option>
            </select>
          </div>

          {/* Date + Time */}
          <div className="row">
            <input type="date" />
            <input type="time" />
          </div>

          {/* Attendees */}
          <input placeholder="Attendees" />

          {/* Topics */}
          <textarea placeholder="Topics Discussed" />

          {/* Materials */}
          <div className="row">
            <button className="light-btn">Search/Add Materials</button>
            <button className="light-btn">Add Sample</button>
          </div>

          {/* Sentiment */}
          <div>
            <label>HCP Sentiment:</label><br />
            <label><input type="radio" name="sentiment" /> Positive</label>
            <label><input type="radio" name="sentiment" /> Neutral</label>
            <label><input type="radio" name="sentiment" /> Negative</label>
          </div>

          {/* Outcomes */}
          <textarea placeholder="Outcomes" />

          {/* Follow-up */}
          <textarea placeholder="Follow-up Actions" />

          {/* AI Suggestions */}
          <div className="suggestions">
            <p>AI Suggested Follow-ups:</p>
            <ul>
              <li>Schedule follow-up in 2 weeks</li>
              <li>Send brochure</li>
              <li>Add to advisory board</li>
            </ul>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <ChatPanel />

    </div>
  );
}

export default App;