import Link from "next/link";

// Mock gerechten voor de homepage preview
const weekDishes = [
  { id: "1", name: "Klassieke Marokkaanse Kip Tajine", desc: "Malse kip met ingelegde citroen, olijven en een rijke mix van ras el hanout kruiden.", time: 35, spice: 2, tags: ["Populair", "Familiefavoriet"], img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&q=80" },
  { id: "2", name: "Thaise Groene Curry met Garnalen", desc: "Pikante, romige kokoscurry vol met verse groenten, bamboescheuten en sappige halal garnalen.", time: 25, spice: 3, tags: ["Snel", "Pikant"], img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80" },
  { id: "3", name: "Turkse Adana Kebab Bowl", desc: "Gekruid runder- en lamsgehakt op een bedje van bulgur, met een frisse herderssalade.", time: 30, spice: 1, tags: ["Eiwitrijk"], img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80" },
];

function SpiceIcons({ level }: { level: number }) {
  return (
      <span>
      {[1, 2, 3].map(i => (
          <span key={i} style={{ opacity: i <= level ? 1 : 0.25, fontSize: "0.85rem" }}>🌶</span>
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
      <div style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>

        {/* ── HERO ── */}
        <section style={{
          background: "#1E3A2F",
          minHeight: "90vh",
          display: "flex", alignItems: "center",
          padding: "4rem 4rem",
          position: "relative", overflow: "hidden"
        }}>
          {/* Decoratieve achtergrond cirkels */}
          <div style={{
            position: "absolute", right: "-5rem", top: "50%", transform: "translateY(-50%)",
            width: 600, height: 600,
            background: "rgba(255,255,255,0.03)", borderRadius: "50%"
          }} />
          <div style={{
            position: "absolute", right: "5rem", top: "10%",
            width: 300, height: 300,
            background: "rgba(200,120,42,0.08)", borderRadius: "50%"
          }} />

          <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 20, padding: "5px 16px",
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.78rem", fontWeight: 600,
              letterSpacing: "1px", textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              Altijd vers, altijd gemakkelijk
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', var(--font-playfair), serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 700, lineHeight: 1.1,
              color: "white", marginBottom: "1.5rem",
              maxWidth: 700
            }}>
              Halal<br />
              wereldgerechten,{" "}
              <span style={{ color: "#C8782A" }}>zo<br />op tafel.</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.05rem", lineHeight: 1.7,
              maxWidth: 480, marginBottom: "2.5rem"
            }}>
              Geen keuzestress, geen tijdverlies. Ontdek elke week nieuwe, heerlijke halal maaltijden, met zorg samengesteld en gemakkelijk thuisbezorgd.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/bestellen" style={{
                background: "#C8782A", color: "white",
                borderRadius: "50px", padding: "14px 32px",
                textDecoration: "none", fontWeight: 700, fontSize: "1rem",
                transition: "all 0.2s"
              }}>Bekijk Boxen</Link>
              <Link href="/menu" style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                borderRadius: "50px", padding: "14px 32px",
                textDecoration: "none", fontWeight: 600, fontSize: "1rem"
              }}>Ontdek Menu</Link>
            </div>
          </div>
        </section>

        {/* ── WAAROM MEKLA ── */}
        <section id="hoe-het-werkt" style={{ padding: "5rem 4rem", background: "#F5F0E8" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem", fontWeight: 700,
              color: "#1E3A2F", marginBottom: "0.75rem"
            }}>Waarom kiezen voor Mekla?</h2>
            <p style={{ color: "#6B7063", fontSize: "1rem", marginBottom: "3rem", maxWidth: 560, margin: "0 auto 3rem" }}>
              Wij geloven in een wereld waar goed, gezond en halal eten toegankelijk is voor iedereen, zonder in te leveren op smaak of tijd.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
              {[
                { icon: "🛡️", title: "100% Halal", desc: "Volledig transparant en betrouwbaar. Al onze ingrediënten zijn strikt halal gecertificeerd.", color: "#F5F0E8" },
                { icon: "🌍", title: "Wereldse Smaken", desc: "Van Marokkaanse tajine tot Thaise curry. Ontdek elke week authentieke recepten.", color: "#FFF3E0" },
                { icon: "⏱️", title: "Tijdbesparend", desc: "Geen uren in de supermarkt of keuken. Gemiddeld in 30 minuten een verse maaltijd.", color: "#FFF8E1" },
                { icon: "🌿", title: "Duurzaam", desc: "Precies afgepaste porties tegen voedselverspilling en focus op milieuvriendelijke keuzes.", color: "#E8F5E9" },
              ].map(item => (
                  <div key={item.title} style={{ textAlign: "center" }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 16,
                      background: item.color, margin: "0 auto 1rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.6rem"
                    }}>{item.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem", color: "#1A1A1A" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.83rem", color: "#6B7063", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOE WERKT HET ── */}
        <section style={{ padding: "5rem 4rem", background: "#F5F0E8" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem", fontWeight: 700,
                color: "#1E3A2F", marginBottom: "2rem"
              }}>Hoe werkt Mekla?</h2>

              {[
                { num: 1, title: "Kies je plan & maaltijden", desc: "Selecteer voor hoeveel personen je kookt en kies uit ons wekelijks wisselende menu van wereldgerechten." },
                { num: 2, title: "Wij bezorgen het vers", desc: "Je ontvangt een gekoelde box met exact afgemeten, verse ingrediënten. Geen verspilling." },
                { num: 3, title: "Kook digitaal of op papier", desc: "Volg de simpele stappen via onze app of kies voor de vertrouwde papieren receptenkaart." },
                { num: 4, title: "Geniet samen", desc: "Zet binnen no-time een heerlijke, halal maaltijd op tafel waar iedereen van kan genieten." },
              ].map(step => (
                  <div key={step.num} style={{ display: "flex", gap: "1.2rem", marginBottom: "1.5rem" }}>
                    <div style={{
                      width: 32, height: 32, minWidth: 32,
                      borderRadius: "50%", background: "#C8782A",
                      color: "white", display: "flex", alignItems: "center",
                      justifyContent: "center", fontWeight: 700, fontSize: "0.85rem",
                      marginTop: 2
                    }}>{step.num}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem", color: "#1A1A1A" }}>{step.title}</div>
                      <div style={{ fontSize: "0.85rem", color: "#6B7063", lineHeight: 1.6 }}>{step.desc}</div>
                    </div>
                  </div>
              ))}

              <Link href="/bestellen" style={{
                color: "#C8782A", textDecoration: "none",
                fontWeight: 600, fontSize: "0.95rem",
                display: "inline-flex", alignItems: "center", gap: 6,
                marginTop: "0.5rem"
              }}>Stel nu je box samen →</Link>
            </div>

            {/* Foto + review card */}
            <div style={{ position: "relative" }}>
              <img
                  src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&q=80"
                  alt="Marokkaanse tajine"
                  style={{ width: "100%", borderRadius: 20, objectFit: "cover", height: 420 }}
              />
              {/* Review kaartje */}
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                background: "white", borderRadius: 16,
                padding: "1.2rem 1.5rem", maxWidth: 300,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
              }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.75rem", lineHeight: 1.4 }}>
                  &quot;Eindelijk een halal maaltijdbox die écht smaakt naar thuis!&quot;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "#F5F0E8", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "0.85rem", color: "#6B7063", fontWeight: 600
                  }}>S</div>
                  <span style={{ fontSize: "0.82rem", color: "#6B7063", fontWeight: 500 }}>Sarah M.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{
          background: "#1E3A2F", padding: "4rem",
          textAlign: "center"
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "white", fontSize: "2rem", marginBottom: "1rem"
          }}>Klaar om te beginnen?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem", fontSize: "1rem" }}>
            Stel je eerste box samen en ontvang volgende week al vers aan de deur.
          </p>
          <Link href="/bestellen" style={{
            background: "#C8782A", color: "white",
            borderRadius: "50px", padding: "14px 40px",
            textDecoration: "none", fontWeight: 700, fontSize: "1rem"
          }}>Bestel Nu</Link>
        </section>

      </div>
  );
}