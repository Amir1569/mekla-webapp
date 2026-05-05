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
            {[
              { label: "Onze Menu's", href: "/ontdekken#menus" },
              { label: "Hoe het werkt", href: "/ontdekken#hoe-het-werkt" },
              { label: "Halal Certificering", href: "/ontdekken#halal" },
            ].map(l => (
                <div key={l.label} style={{ marginBottom: "0.6rem" }}>
                  <Link href={l.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.85rem" }}>{l.label}</Link>
                </div>
            ))}
          </div>

          {/* Service */}
          <div>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>Service</h4>
            {[
              { label: "Veelgestelde vragen", href: "/service#faq" },
              { label: "Klantenservice", href: "/service#klantenservice" },
              { label: "Bezorging", href: "/service#bezorging" },
            ].map(l => (
                <div key={l.label} style={{ marginBottom: "0.6rem" }}>
                  <Link href={l.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.85rem" }}>{l.label}</Link>
                </div>
            ))}
          </div>

          {/* Duurzaamheid */}
          <div>
            <h4 style={{ color: "white", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>Duurzaamheid</h4>
            {[
              { label: "Onze Verpakkingen", href: "/duurzaamheid#verpakkingen" },
              { label: "Voedselverspilling", href: "/duurzaamheid#voedselverspilling" },
              { label: "Digitale Recepten", href: "/duurzaamheid#digitale-recepten" },
            ].map(l => (
                <div key={l.label} style={{ marginBottom: "0.6rem" }}>
                  <Link href={l.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.85rem" }}>{l.label}</Link>
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