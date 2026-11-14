//components/message.js
import { useState } from "react";
export default function Message() {
  const [message, setMessage] = useState("Hello!");
  console.log("message state:", message);
  console.log("Message Component Render.");
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Message Switcher</h2>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "skyblue",
        }}
        onClick={() => setMessage("Clicked!")}
      >
        Change Message
      </button>
      <p style={{ fontSize: "18px", marginTop: "15px" }}>{message}</p>
    </div>
  );
}
