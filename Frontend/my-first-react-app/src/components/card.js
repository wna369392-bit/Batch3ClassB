//components/card.js
export default function Card(props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}
