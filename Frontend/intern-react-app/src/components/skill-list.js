export default function SkillList({ skills }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        margin: "10px",
        backgroundColor: "gray",
      }}
    >
      <h2>My Skills</h2>

      <ul>
        {skills.map((skill, index) => (
          <li
            key={index}
            style={{
              padding: "8px",
              margin: "5px",
              backgroundColor: "#333",
              borderRadius: "5px"
            }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
