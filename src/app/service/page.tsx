"use client";
import { useState } from "react";

const faqs = [
    { q: "Hoe vaak wordt er bezorgd?", a: "Wij bezorgen twee keer per week: op maandag en vrijdag. Bij het bestellen kies je zelf welk levermoment het beste past." },
    { q: "Tot wanneer kan ik bestellen?", a: "Je kunt bestellen tot 48 uur voor het gekozen levermoment. Voor maandagbezorging is de deadline dus zaterdag, voor vrijdag is dat woensdag." },
    { q: "Kan ik mijn bestelling wijzigen of annuleren?", a: "Ja, je kunt je bestelling wijzigen of annuleren tot 48 uur voor bezorging. Neem hiervoor contact op via onze klantenservice." },
    { q: "Zijn alle gerechten echt halal?", a: "Absoluut. Alle ingrediënten zijn strikt halal gecertificeerd. We werken alleen met erkende halal leveranciers en controleren elk gerecht zorgvuldig." },
    { q: "Wat als ik een allergie heb?", a: "Bij elk gerecht vermelden we duidelijk alle allergenen. Heb je een specifieke allergie? Neem contact op voor persoonlijk advies." },
    { q: "Hoe lang zijn de ingrediënten houdbaar?", a: "Alle ingrediënten worden vers bezorgd en zijn minimaal 3 dagen houdbaar na levering, mits correct bewaard in de koelkast." },
    { q: "Kan ik ook een box cadeau geven?", a: "Ja! Neem contact op via onze klantenservice en we regelen een mooie cadeaubox voor je." },
    { q: "Wat kost de bezorging?", a: "Bezorging is altijd gratis bij Mekla. Geen verborgen kosten!" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            border: "1px solid #E8E3D9", borderRadius: 12,
            overflow: "hidden", marginBottom: "0.75rem"
        }}>
            <button onClick={() => setOpen(!open)} style={{
                width: "100%", background: open ? "#F5F0E8" : "white",
                border: "none", padding: "1.1rem 1.5rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer", fontFamily: "inherit",
                fontSize: "0.92rem", fontWeight: 600, color: "#1E3A2F",
                textAlign: "left"
            }}>
                {q}
                <span style={{ fontSize: "1.2rem", color: "#C8782A", minWidth: 20 }}>{open ? "−" : "+"}</span>
            </button>
            {open && (
                <div style={{
                    padding: "1rem 1.5rem 1.2rem",
                    fontSize: "0.88rem", color: "#6B7063", lineHeight: 1.7,
                    background: "white", borderTop: "1px solid #E8E3D9"
                }}>{a}</div>
            )}
        </div>
    );
}

export default function ServicePage() {
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
                }}>Service & Support</h1>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 2rem" }}>
                    We staan altijd voor je klaar. Vind hier antwoorden op veelgestelde vragen of neem direct contact op.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    {[
                        { label: "Veelgestelde vragen", href: "#faq" },
                        { label: "Klantenservice", href: "#klantenservice" },
                        { label: "Bezorging", href: "#bezorging" },
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

            {/* ── FAQ ── */}
            <section id="faq" style={{ padding: "5rem 4rem", background: "white" }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <div style={{
                            display: "inline-block", background: "#F5F0E8",
                            borderRadius: 20, padding: "4px 16px",
                            fontSize: "0.78rem", fontWeight: 600,
                            color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                        }}>FAQ</div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "2rem", fontWeight: 700, color: "#1E3A2F"
                        }}>Veelgestelde vragen</h2>
                    </div>
                    {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
                </div>
            </section>

            {/* ── KLANTENSERVICE ── */}
            <section id="klantenservice" style={{ padding: "5rem 4rem", background: "#F5F0E8" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <div style={{
                            display: "inline-block", background: "white",
                            borderRadius: 20, padding: "4px 16px",
                            fontSize: "0.78rem", fontWeight: 600,
                            color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                        }}>Klantenservice</div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "2rem", fontWeight: 700, color: "#1E3A2F", marginBottom: "1rem"
                        }}>Wij staan voor je klaar</h2>
                        <p style={{ color: "#6B7063", maxWidth: 500, margin: "0 auto" }}>
                            Heb je een vraag, opmerking of probleem? Ons team staat 7 dagen per week voor je klaar.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
                        {[
                            { icon: "📧", title: "E-mail", desc: "Stuur ons een e-mail en we reageren binnen 24 uur.", contact: "info@mekla.be", link: "mailto:info@mekla.be" },
                            { icon: "💬", title: "WhatsApp", desc: "Stuur ons een WhatsApp bericht voor snelle hulp.", contact: "+32 470 00 00 00", link: "https://wa.me/3247000000" },
                            { icon: "📸", title: "Instagram", desc: "Volg ons en stuur een DM voor vragen of feedback.", contact: "@mekla.be", link: "#" },
                        ].map(item => (
                            <div key={item.title} style={{
                                background: "white", borderRadius: 16,
                                padding: "2rem", textAlign: "center"
                            }}>
                                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.icon}</div>
                                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1E3A2F", marginBottom: "0.5rem" }}>{item.title}</h3>
                                <p style={{ fontSize: "0.83rem", color: "#6B7063", lineHeight: 1.6, marginBottom: "1rem" }}>{item.desc}</p>
                                <a href={item.link} style={{
                                    color: "#C8782A", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none"
                                }}>{item.contact}</a>
                            </div>
                        ))}
                    </div>

                    {/* Openingstijden */}
                    <div style={{
                        background: "#1E3A2F", borderRadius: 16,
                        padding: "2rem", maxWidth: 600, margin: "0 auto"
                    }}>
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "white", fontSize: "1.2rem",
                            textAlign: "center", marginBottom: "1.5rem"
                        }}>Bereikbaarheid</h3>
                        {[
                            { dag: "Maandag – Vrijdag", tijd: "9:00 – 20:00" },
                            { dag: "Zaterdag", tijd: "10:00 – 18:00" },
                            { dag: "Zondag", tijd: "12:00 – 17:00" },
                        ].map(item => (
                            <div key={item.dag} style={{
                                display: "flex", justifyContent: "space-between",
                                padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.1)",
                                fontSize: "0.88rem"
                            }}>
                                <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.dag}</span>
                                <span style={{ color: "white", fontWeight: 600 }}>{item.tijd}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BEZORGING ── */}
            <section id="bezorging" style={{ padding: "5rem 4rem", background: "white" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
                        <div>
                            <div style={{
                                display: "inline-block", background: "#F5F0E8",
                                borderRadius: 20, padding: "4px 16px",
                                fontSize: "0.78rem", fontWeight: 600,
                                color: "#C8782A", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1
                            }}>Bezorging</div>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "2rem", fontWeight: 700,
                                color: "#1E3A2F", marginBottom: "1rem"
                            }}>Twee keer per week vers aan de deur</h2>
                            <p style={{ color: "#6B7063", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Wij bezorgen op maandag en vrijdag zodat je altijd verse ingrediënten hebt voor de week. Jij kiest het tijdslot dat het beste past bij jouw schema.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {[
                                    { icon: "📦", title: "Gekoelde bezorging", desc: "Jouw box wordt bezorgd in een gekoelde verpakking zodat alles vers aankomt." },
                                    { icon: "🗓️", title: "Flexibel tijdslot", desc: "Kies bij het bestellen je leverdag en tijdslot: ochtend, middag of avond." },
                                    { icon: "🔔", title: "Bezorgmelding", desc: "Je ontvangt een melding wanneer je bezorging onderweg is." },
                                    { icon: "💚", title: "Gratis bezorging", desc: "Bezorging is altijd gratis. Geen verborgen kosten!" },
                                ].map(item => (
                                    <div key={item.title} style={{
                                        display: "flex", gap: "1rem",
                                        padding: "1rem", background: "#F5F0E8",
                                        borderRadius: 12
                                    }}>
                                        <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1A1A1A", marginBottom: 2 }}>{item.title}</div>
                                            <div style={{ fontSize: "0.82rem", color: "#6B7063" }}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bezorgtijden tabel */}
                        <div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.3rem", color: "#1E3A2F",
                                marginBottom: "1.5rem"
                            }}>Bezorgmomenten</h3>
                            {[
                                { dag: "Maandag", slots: ["10:00 – 13:00", "13:00 – 17:00", "17:00 – 20:00"] },
                                { dag: "Vrijdag", slots: ["10:00 – 13:00", "13:00 – 17:00", "17:00 – 20:00"] },
                            ].map(item => (
                                <div key={item.dag} style={{ marginBottom: "1.5rem" }}>
                                    <div style={{
                                        fontWeight: 700, fontSize: "0.95rem",
                                        color: "#1E3A2F", marginBottom: "0.75rem",
                                        display: "flex", alignItems: "center", gap: 8
                                    }}>
                    <span style={{
                        background: "#1E3A2F", color: "white",
                        borderRadius: 8, padding: "2px 10px",
                        fontSize: "0.8rem"
                    }}>{item.dag}</span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        {item.slots.map(slot => (
                                            <div key={slot} style={{
                                                background: "#F5F0E8", borderRadius: 10,
                                                padding: "0.75rem 1rem",
                                                fontSize: "0.88rem", color: "#1A1A1A",
                                                display: "flex", alignItems: "center", gap: 8
                                            }}>
                                                🕐 {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div style={{
                                background: "#1E3A2F", borderRadius: 12,
                                padding: "1.2rem", color: "white",
                                fontSize: "0.85rem", lineHeight: 1.6
                            }}>
                                <strong>📍 Bezorggebied:</strong> momenteel bezorgen we in Antwerpen en omgeving. Meer steden volgen binnenkort!
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}