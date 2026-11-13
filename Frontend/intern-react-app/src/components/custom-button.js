export default function CustomButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "brown",
        color: "white",
        padding: "12px 25px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
      }}
    >
      Hire Me
    </button>
  );
}
