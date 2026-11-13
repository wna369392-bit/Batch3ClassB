export default function CardWrapper({ children }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "25px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        backgroundColor: "gray",
      }}
    >
      {children}
    </div>
  );
}
