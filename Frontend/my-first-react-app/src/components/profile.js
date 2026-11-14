export default function Profile(props) {
  console.log("User props data:", props.user);
  if (!props.user) {
    return (
      <div>
        <h2> user data not found.</h2>
      </div>
    );
  }
  return (
    <div>
      <h3>Name:{props.user.name}</h3>
      <p>Age: {props.user.age}</p>
      <p>Country: {props.user.country}</p>
    </div>
  );
}
