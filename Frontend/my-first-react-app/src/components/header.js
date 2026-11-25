//header.js
"use client";
import Link from "next/link";
export default function Header() {
  return (
    <header
      style={{
        background: "#1976d2",
        color: "red",
        padding: "1rem",
      }}
    >
      <Link href="/" style={{ color: "red", marginRight: "10px" }}>
        Home
      </Link>
      <Link href="/about" style={{ color: "red", marginRight: "10px" }}>
        About
      </Link>
      <Link href="/contact" style={{ color: "red", marginRight: "10px" }}>
        Contact
      </Link>
    </header>
  );
}
