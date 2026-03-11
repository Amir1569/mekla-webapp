"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "white",
        borderBottom: "1px solid #E8E3D9",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36,
            background: "#1E3A2F", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "1.1rem"
          }}>🍽</div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem", fontWeight: 700,
            color: "#1E3A2F"
          }}>Mekla</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/#hoe-het-werkt" style={{
            textDecoration: "none",
            color: pathname === "/hoe-het-werkt" ? "#1E3A2F" : "#6B7063",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem", fontWeight: 500
          }}>Hoe het werkt</Link>

          <Link href="/menu" style={{
            textDecoration: "none",
            color: pathname === "/menu" ? "#1E3A2F" : "#6B7063",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem", fontWeight: 500
          }}>Weekmenu</Link>

          <Link href="/bestellen" style={{
            background: "#C8782A", color: "white",
            borderRadius: "24px", padding: "9px 20px",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "6px",
            transition: "background 0.2s"
          }}>
            🛒 Bestel Nu
          </Link>
        </div>
      </nav>
  );
}