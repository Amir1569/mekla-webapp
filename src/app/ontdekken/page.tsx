import Link from "next/link";

export default function OntdekkenPage() {
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
                }}>Ontdek Mekla</h1>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 2rem" }}>
                    Alles wat je moet weten over ons menu, hoe we werken en onze halal certificering.
                </p>
                {/* Anchor navigatie */}
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    {[
                        { label: "Onze Menu's", href: "#menus" },
                        { label: "Hoe het werkt", href: "#hoe-het-werkt" },
                        { label: "Halal Certificering", href: "#halal" },
                    ].map(item => (
                        <a key={item.href} href={item.href} style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "white", borderRadius: 50,
                            padding: "8px 20px", textDecoration: "none",
                            fontSize: "0.88rem", fontWeight: 500,
                            transition: "background 0.2s"
                        }}>{item.label}</a>
                    ))}
                </div>
            </section>

            {/* ── ONZE MENU'S ── */}
            <section id="menus" style={{ padding: "5rem 4rem", background: "white" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                        <div>
                            <div style={{
                                display: "inline-block", background: "#F5F0E8",
                                borderRadius: 20, padding: "4px 16px",
                                fontSize: "0.78rem", fontWeight: 600,
                                color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                            }}>Onze Menu&#39;s</div>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "2rem", fontWeight: 700,
                                color: "#1E3A2F", marginBottom: "1rem"
                            }}>Elke week nieuwe wereldgerechten</h2>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Ons weekmenu bestaat uit zorgvuldig geselecteerde gerechten uit verschillende wereldkeukens. Van Marokkaanse tajine tot Thaise curry — elke week een nieuwe culinaire ontdekkingsreis.
                            </p>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Alle gerechten zijn 100% halal gecertificeerd en worden bereid met verse, lokaal ingekochte ingrediënten waar mogelijk. We werken samen met betrouwbare leveranciers die onze kwaliteitsnormen delen.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {[
                                    "🌍 Wekelijks wisselend menu van wereldgerechten",
                                    "🥗 Verse ingrediënten, exact afgemeten per portie",
                                    "⏱️ Klaar in gemiddeld 30 minuten",
                                    "👨‍👩‍👧 Keuze uit 1 tot 6 personen",
                                ].map(item => (
                                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "#1A1A1A" }}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <Link href="/menu" style={{
                                display: "inline-block", marginTop: "2rem",
                                background: "#C8782A", color: "white",
                                borderRadius: 50, padding: "12px 28px",
                                textDecoration: "none", fontWeight: 700, fontSize: "0.9rem"
                            }}>Bekijk het weekmenu →</Link>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            {[
                                { emoji: "🍲", land: "Marokko", gerecht: "Tajine" },
                                { emoji: "🍛", land: "Thailand", gerecht: "Curry" },
                                { emoji: "🥙", land: "Turkije", gerecht: "Kebab" },
                                { emoji: "🍚", land: "Indonesië", gerecht: "Nasi Goreng" },
                            ].map(item => (
                                <div key={item.land} style={{
                                    background: "#F5F0E8", borderRadius: 16,
                                    padding: "1.5rem", textAlign: "center"
                                }}>
                                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{item.emoji}</div>
                                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1E3A2F" }}>{item.land}</div>
                                    <div style={{ fontSize: "0.8rem", color: "#6B7063" }}>{item.gerecht}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOE HET WERKT ── */}
            <section id="hoe-het-werkt" style={{ padding: "5rem 4rem", background: "#F5F0E8" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <div style={{
                            display: "inline-block", background: "white",
                            borderRadius: 20, padding: "4px 16px",
                            fontSize: "0.78rem", fontWeight: 600,
                            color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                        }}>Hoe het werkt</div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "2rem", fontWeight: 700,
                            color: "#1E3A2F", marginBottom: "1rem"
                        }}>Van bestelling tot bord in 4 stappen</h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
                        {[
                            { num: 1, title: "Kies je plan", desc: "Selecteer hoeveel personen je kookt en hoeveel maaltijden je per week wilt ontvangen.", icon: "📋" },
                            { num: 2, title: "Kies je gerechten", desc: "Blader door ons weekmenu en kies de gerechten die jou aanspreken. Elke week nieuwe opties!", icon: "🍽️" },
                            { num: 3, title: "Wij bezorgen", desc: "Jouw gekoelde box met verse, exact afgemeten ingrediënten wordt bezorgd op het gekozen moment.", icon: "🚚" },
                            { num: 4, title: "Kook & geniet", desc: "Volg het digitale of papieren recept en zet binnen 30 minuten een heerlijke halal maaltijd op tafel.", icon: "👨‍🍳" },
                        ].map(step => (
                            <div key={step.num} style={{
                                background: "white", borderRadius: 16,
                                padding: "1.5rem", textAlign: "center"
                            }}>
                                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{step.icon}</div>
                                <div style={{
                                    width: 28, height: 28, borderRadius: "50%",
                                    background: "#C8782A", color: "white",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontWeight: 700, fontSize: "0.8rem",
                                    margin: "0 auto 0.75rem"
                                }}>{step.num}</div>
                                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1E3A2F", marginBottom: "0.5rem" }}>{step.title}</h3>
                                <p style={{ fontSize: "0.82rem", color: "#6B7063", lineHeight: 1.6 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                        <Link href="/bestellen" style={{
                            background: "#1E3A2F", color: "white",
                            borderRadius: 50, padding: "14px 36px",
                            textDecoration: "none", fontWeight: 700, fontSize: "1rem",
                            display: "inline-block"
                        }}>Start nu met bestellen →</Link>
                    </div>
                </div>
            </section>

            {/* ── HALAL CERTIFICERING ── */}
            <section id="halal" style={{ padding: "5rem 4rem", background: "white" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                        <div>
                            <div style={{
                                display: "inline-block", background: "#F5F0E8",
                                borderRadius: 20, padding: "4px 16px",
                                fontSize: "0.78rem", fontWeight: 600,
                                color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                            }}>Halal Certificering</div>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "2rem", fontWeight: 700,
                                color: "#1E3A2F", marginBottom: "1rem"
                            }}>100% halal, volledig transparant</h2>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Bij Mekla is halal niet zomaar een label — het is een belofte. Alle ingrediënten die wij gebruiken zijn strikt halal gecertificeerd door erkende certificeringsinstanties.
                            </p>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Wij werken uitsluitend samen met leveranciers die kunnen aantonen dat hun producten voldoen aan de islamitische voedingsrichtlijnen. Elk gerecht wordt zorgvuldig gecontroleerd voor het in ons menu wordt opgenomen.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {[
                                    { title: "Gecertificeerde ingrediënten", desc: "Alle vlees en producten zijn afkomstig van erkende halal leveranciers." },
                                    { title: "Geen kruisbesmetting", desc: "Onze processen zorgen ervoor dat halal producten nooit in contact komen met niet-halal producten." },
                                    { title: "Volledige traceerbaarheid", desc: "Van boer tot bord kunnen wij de herkomst van elk ingrediënt traceren." },
                                    { title: "Allergeneninformatie", desc: "Bij elk gerecht vermelden we duidelijk alle allergenen zodat je altijd weet wat je eet." },
                                ].map(item => (
                                    <div key={item.title} style={{
                                        display: "flex", gap: "1rem",
                                        background: "#F5F0E8", borderRadius: 12, padding: "1rem"
                                    }}>
                                        <div style={{
                                            width: 24, height: 24, minWidth: 24,
                                            background: "#1E3A2F", borderRadius: "50%",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "white", fontSize: "0.7rem", fontWeight: 700
                                        }}>✓</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1A1A1A", marginBottom: 2 }}>{item.title}</div>
                                            <div style={{ fontSize: "0.82rem", color: "#6B7063" }}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{
                            background: "#1E3A2F", borderRadius: 20,
                            padding: "3rem", textAlign: "center", color: "white"
                        }}>
                            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛡️</div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.5rem", marginBottom: "1rem"
                            }}>Onze belofte</h3>
                            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "2rem" }}>
                                Wij begrijpen hoe belangrijk halal eten is voor onze klanten en hun families. Daarom gaan wij verder dan het minimum — wij streven naar volledige transparantie in alles wat wij doen.
                            </p>
                            <div style={{
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: 12, padding: "1.5rem"
                            }}>
                                <div style={{ fontSize: "2rem", fontWeight: 700, color: "#C8782A" }}>100%</div>
                                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>van onze ingrediënten is halal gecertificeerd</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
