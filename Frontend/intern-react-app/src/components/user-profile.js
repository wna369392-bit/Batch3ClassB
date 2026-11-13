export default function UserProfile({ user }) {
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
      <h2>User Profile</h2>

      <p>Name: {user.name}</p>

      <p>Role: {user.role}</p>

      <p>Company: {user.company}</p>
    </div>
  );
}
