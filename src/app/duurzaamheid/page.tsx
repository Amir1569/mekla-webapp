import Link from "next/link";

export default function DuurzaamheidPage() {
    return (
        <div style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>

            {/* ── PAGE HEADER ── */}
            <section style={{
                background: "#1E3A2F", padding: "4rem",
                textAlign: "center"
            }}>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem", fontWeight: 700,
                    color: "white", marginBottom: "1rem"
                }}>Duurzaamheid</h1>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 2rem" }}>
                    Bij Mekla geloven we dat lekker eten en een gezonde planeet hand in hand gaan. Ontdek hoe wij bijdragen aan een duurzamere wereld.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    {[
                        { label: "Onze Verpakkingen", href: "#verpakkingen" },
                        { label: "Voedselverspilling", href: "#voedselverspilling" },
                        { label: "Digitale Recepten", href: "#digitale-recepten" },
                    ].map(item => (
                        <a key={item.href} href={item.href} style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "white", borderRadius: 50,
                            padding: "8px 20px", textDecoration: "none",
                            fontSize: "0.88rem", fontWeight: 500
                        }}>{item.label}</a>
                    ))}
                </div>
            </section>

            {/* ── STATS BALK ── */}
            <section style={{ background: "#C8782A", padding: "2.5rem 4rem" }}>
                <div style={{
                    maxWidth: 1100, margin: "0 auto",
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "2rem", textAlign: "center"
                }}>
                    {[
                        { num: "100%", label: "Gerecyclede verpakkingen" },
                        { num: "0g", label: "Voedselverspilling door exacte porties" },
                        { num: "90%", label: "Minder papier met digitale recepten" },
                    ].map(item => (
                        <div key={item.label}>
                            <div style={{ fontSize: "2rem", fontWeight: 700, color: "white", marginBottom: 4 }}>{item.num}</div>
                            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── ONZE VERPAKKINGEN ── */}
            <section id="verpakkingen" style={{ padding: "5rem 4rem", background: "white" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                        <div>
                            <div style={{
                                display: "inline-block", background: "#E8F5E9",
                                borderRadius: 20, padding: "4px 16px",
                                fontSize: "0.78rem", fontWeight: 600,
                                color: "#2E7D32", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                            }}>🌿 Onze Verpakkingen</div>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "2rem", fontWeight: 700,
                                color: "#1E3A2F", marginBottom: "1rem"
                            }}>Milieuvriendelijk van binnen en buiten</h2>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Onze maaltijdboxen zijn ontworpen met het milieu in gedachten. We gebruiken uitsluitend gerecyclede en recyclebare materialen, zodat jouw heerlijke maaltijd geen zware voetafdruk achterlaat.
                            </p>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "2rem" }}>
                                De gekoelde box houdt ingrediënten vers tijdens transport zonder gebruik te maken van schadelijke koelmiddelen. Na gebruik zijn alle componenten gescheiden recyclebaar.
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                {[
                                    { icon: "♻️", title: "100% recyclebaar", desc: "Alle verpakkingsmaterialen zijn recyclebaar." },
                                    { icon: "🌱", title: "Gerecycled karton", desc: "De buitendoos is gemaakt van gerecycled karton." },
                                    { icon: "❄️", title: "Natuurlijke koeling", desc: "We koelen met herbruikbare gel-packs zonder chemicaliën." },
                                    { icon: "🚫", title: "Geen plastic zakjes", desc: "Ingrediënten in papieren zakjes, geen onnodig plastic." },
                                ].map(item => (
                                    <div key={item.title} style={{
                                        background: "#F5F0E8", borderRadius: 12, padding: "1rem"
                                    }}>
                                        <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{item.icon}</div>
                                        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#1E3A2F", marginBottom: 2 }}>{item.title}</div>
                                        <div style={{ fontSize: "0.78rem", color: "#6B7063" }}>{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visuele weergave */}
                        <div style={{
                            background: "#F5F0E8", borderRadius: 20,
                            padding: "3rem", textAlign: "center"
                        }}>
                            <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>📦</div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.3rem", color: "#1E3A2F", marginBottom: "1.5rem"
                            }}>Wat zit er in jouw box?</h3>
                            {[
                                { item: "Buitendoos", materiaal: "Gerecycled karton" },
                                { item: "Koeling", materiaal: "Herbruikbare gel-packs" },
                                { item: "Zakjes", materiaal: "Papier of biocomposteerbaar" },
                                { item: "Receptkaart", materiaal: "Gerecycled papier (optioneel)" },
                            ].map(row => (
                                <div key={row.item} style={{
                                    display: "flex", justifyContent: "space-between",
                                    padding: "0.7rem 0", borderBottom: "1px solid #E8E3D9",
                                    fontSize: "0.88rem"
                                }}>
                                    <span style={{ color: "#6B7063" }}>{row.item}</span>
                                    <span style={{ fontWeight: 600, color: "#1E3A2F" }}>✓ {row.materiaal}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VOEDSELVERSPILLING ── */}
            <section id="voedselverspilling" style={{ padding: "5rem 4rem", background: "#F5F0E8" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

                        {/* Visueel links */}
                        <div style={{
                            background: "#1E3A2F", borderRadius: 20,
                            padding: "3rem", color: "white"
                        }}>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.5rem", marginBottom: "2rem"
                            }}>Traditioneel winkelen vs Mekla</h3>
                            {[
                                { label: "Supermarkt", verspilling: "30%", color: "#EF5350" },
                                { label: "Mekla box", verspilling: "~2%", color: "#4CAF50"  },
                            ].map(item => (
                                <div key={item.label} style={{ marginBottom: "1.5rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem" }}>{item.label}</span>
                                        <span style={{ fontWeight: 700, color: item.color }}>{item.verspilling} verspilling</span>
                                    </div>
                                    <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4 }}>
                                        <div style={{
                                            height: "100%", borderRadius: 4,
                                            background: item.color,
                                            width: item.verspilling === "~2%" ? "5%" : "30%"
                                        }} />
                                    </div>
                                </div>
                            ))}
                            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: 1.6, marginTop: "1.5rem" }}>
                                Gemiddeld gooit een Belgisch gezin 15kg voedsel per jaar weg. Met Mekla breng je dat terug naar bijna nul.
                            </p>
                        </div>

                        <div>
                            <div style={{
                                display: "inline-block", background: "white",
                                borderRadius: 20, padding: "4px 16px",
                                fontSize: "0.78rem", fontWeight: 600,
                                color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                            }}>🌱 Voedselverspilling</div>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "2rem", fontWeight: 700,
                                color: "#1E3A2F", marginBottom: "1rem"
                            }}>Exact op maat, geen grammetje te veel</h2>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Een van de grootste voordelen van onze maaltijdboxen is dat we exact de juiste hoeveelheid ingrediënten meesturen. Geen halve uien die weken in de koelkast liggen, geen blikken die je vergeet te gebruiken.
                            </p>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Elk recept wordt zorgvuldig berekend zodat je precies genoeg hebt voor het aangegeven aantal personen — niet meer, niet minder.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {[
                                    "Exacte porties per persoon — niks te veel",
                                    "Wekelijks wisselend menu vermindert overvoorraad",
                                    "Seizoensgebonden ingrediënten voor minder transport",
                                    "Samenwerking met lokale leveranciers waar mogelijk",
                                ].map(item => (
                                    <div key={item} style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        fontSize: "0.88rem", color: "#1A1A1A"
                                    }}>
                                        <span style={{ color: "#4CAF50", fontWeight: 700 }}>✓</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DIGITALE RECEPTEN ── */}
            <section id="digitale-recepten" style={{ padding: "5rem 4rem", background: "white" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <div style={{
                            display: "inline-block", background: "#F5F0E8",
                            borderRadius: 20, padding: "4px 16px",
                            fontSize: "0.78rem", fontWeight: 600,
                            color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                        }}>📱 Digitale Recepten</div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "2rem", fontWeight: 700, color: "#1E3A2F", marginBottom: "1rem"
                        }}>Kook slim, kook digitaal</h2>
                        <p style={{ color: "#6B7063", maxWidth: 560, margin: "0 auto" }}>
                            Kies voor onze digitale recepten en help mee het papierverbruik te verminderen. Stap voor stap instructies, altijd bij de hand op je telefoon of computer.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
                        {[
                            { icon: "📱", title: "Altijd beschikbaar", desc: "Je recept is beschikbaar op alle apparaten — telefoon, tablet of computer. Open het wanneer je het nodig hebt." },
                            { icon: "🌿", title: "90% minder papier", desc: "Door te kiezen voor digitaal help je mee aan het verminderen van papierafval. Goed voor jou, goed voor de planeet." },
                            { icon: "🔄", title: "Altijd up-to-date", desc: "Digitale recepten kunnen we eenvoudig verbeteren op basis van feedback van onze klanten." },
                        ].map(item => (
                            <div key={item.title} style={{
                                background: "#F5F0E8", borderRadius: 16,
                                padding: "2rem", textAlign: "center"
                            }}>
                                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.icon}</div>
                                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1E3A2F", marginBottom: "0.75rem" }}>{item.title}</h3>
                                <p style={{ fontSize: "0.83rem", color: "#6B7063", lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Voorbeeld recept stappen */}
                    <div style={{
                        background: "#1E3A2F", borderRadius: 20,
                        padding: "2.5rem", maxWidth: 700, margin: "0 auto"
                    }}>
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "white", fontSize: "1.2rem",
                            textAlign: "center", marginBottom: "0.5rem"
                        }}>Voorbeeld: Marokkaanse Kip Tajine</h3>
                        <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
                            ⏱ 35 min · 👥 2 personen · 🌶 Medium
                        </p>
                        {[
                            { stap: 1, tekst: "Snijd de ui en knoflook fijn. Verhit olie in een tajinepot op middelhoog vuur." },
                            { stap: 2, tekst: "Bak de ui 5 minuten tot glazig. Voeg knoflook, ras el hanout en gember toe." },
                            { stap: 3, tekst: "Voeg de kip toe en bak rondom bruin, ca. 5 minuten per kant." },
                            { stap: 4, tekst: "Voeg citroen, olijven en 150ml water toe. Dek af en laat 25 minuten sudderen." },
                            { stap: 5, tekst: "Serveer met couscous en bestrooi met verse peterselie. Eet smakelijk! 🍽️" },
                        ].map(item => (
                            <div key={item.stap} style={{
                                display: "flex", gap: "1rem",
                                padding: "0.8rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)"
                            }}>
                                <div style={{
                                    width: 24, height: 24, minWidth: 24,
                                    background: "#C8782A", borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "white", fontWeight: 700, fontSize: "0.75rem"
                                }}>{item.stap}</div>
                                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                                    {item.tekst}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                        <Link href="/bestellen" style={{
                            background: "#C8782A", color: "white",
                            borderRadius: 50, padding: "14px 36px",
                            textDecoration: "none", fontWeight: 700, fontSize: "1rem",
                            display: "inline-block"
                        }}>Probeer het zelf →</Link>
                    </div>
                </div>
            </section>

        </div>
    );
}