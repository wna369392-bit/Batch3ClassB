import { useState } from "react";
export default function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);
  const ToggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <h2
        style={{ fontSize: "18px", padding: "15px", fontFamily: "sans-serif" }}
      >
        Conditional Message
      </h2>
      <button
        onClick={ToggleVisibility}
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "skyblue",
          color: "white",
        }}
      >
        {isVisible ? "Hide Message" : "Show Message"}
      </button>
      <div>
        {isVisible && (
          <p style={{ color: "gold", fontSize: "18px" }}>
            This is a secret message
          </p>
        )}
      </div>
    </div>
  );
}
