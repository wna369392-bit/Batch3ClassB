"user client";
import { use } from "react";

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Product ID:{resolvedParams.id}</h2>
    </div>
  );
}
