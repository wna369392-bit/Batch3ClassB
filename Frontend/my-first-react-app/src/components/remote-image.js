import Image from "next/image";
export default function RemoteImage() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Remote Link Image Example</h1>
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Sample remote image from Unsplash"
        width={600}
        height={400}
      />
    </div>
  );
}
