import Link from "next/link";

export default function Footer() {
  return (
      <footer style={{
        background: "#1E3A2F", color: "rgba(255,255,255,0.7)",
        padding: "3rem 4rem 2rem",
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem", marginBottom: "2.5rem"
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div style={{
                width: 32, height: 32, background: "#C8782A",
                borderRadius: 8, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.9rem"
              }}>🍽</div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem", fontWeight: 700, color: "white"
              }}>Mekla</span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 220 }}>
              Altijd vers, altijd gemakkelijk. De lekkerste halal wereldgerechten, wekelijks bij jou thuisbezorgd.
            </p>
          </div>

          {/* Ontdekken */}
          <div>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>Ontdekken</h4>
            {["Onze Menu's", "Hoe het werkt", "Halal Certificering"].map(l => (
                <div key={l} style={{ marginBottom: "0.6rem" }}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.85rem" }}>{l}</a>
                </div>
            ))}
          </div>

          {/* Service */}
          <div>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>Service</h4>
            {["Veelgestelde vragen", "Klantenservice", "Bezorging"].map(l => (
                <div key={l} style={{ marginBottom: "0.6rem" }}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.85rem" }}>{l}</a>
                </div>
            ))}
          </div>

          {/* Duurzaamheid */}
          <div>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>Duurzaamheid</h4>
            {["Onze Verpakkingen", "Voedselverspilling", "Digitale Recepten"].map(l => (
                <div key={l} style={{ marginBottom: "0.6rem" }}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.85rem" }}>{l}</a>
                </div>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between",
          fontSize: "0.8rem", maxWidth: 1100, margin: "0 auto"
        }}>
          <span>© 2026 Mekla. Alle rechten voorbehouden.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Voorwaarden</a>
          </div>
        </div>
      </footer>
  );
}