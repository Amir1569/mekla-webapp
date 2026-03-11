"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ── Types ────────────────────────────────────────────────────────────────────
type Dish = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url?: string;
  allergens?: string[];
};

type Slot = {
  id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
};

type OrderState = {
  persons: number;
  meals_per_week: number;
  selected_dish_ids: string[];
  recipe_format: "digital" | "paper" | null;
  full_name: string;
  address: string;
  email: string;
  slot_id: string | null;
};

// ── Mock data fallbacks ──────────────────────────────────────────────────────
const MOCK_DISHES: Dish[] = [
  { id: "1", name: "Marokkaanse Kip Tajine", price_cents: 1250, image_url: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=300&q=80", description: "" },
  { id: "2", name: "Thaise Groene Curry", price_cents: 1350, image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&q=80", description: "" },
  { id: "3", name: "Turkse Adana Kebab", price_cents: 1150, image_url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&q=80", description: "" },
  { id: "4", name: "Indonesische Nasi Goreng", price_cents: 1100, image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&q=80", description: "" },
  { id: "5", name: "Libanese Mezze", price_cents: 1000, image_url: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=300&q=80", description: "" },
];

const MOCK_SLOTS: Slot[] = [
  { id: "s1", slot_date: "2026-03-17", start_time: "17:00", end_time: "19:00" },
  { id: "s2", slot_date: "2026-03-19", start_time: "17:00", end_time: "19:00" },
  { id: "s3", slot_date: "2026-03-21", start_time: "16:00", end_time: "18:30" },
];

// ── Step indicator ───────────────────────────────────────────────────────────
const STEP_LABELS = ["Jouw Plan", "Gerechten", "Voorkeuren", "Afronden"];

function StepBar({ current }: { current: number }) {
  return (
      <div style={{
        background: "white", borderBottom: "1px solid #E8E3D9",
        padding: "1.2rem 4rem"
      }}>
        <div style={{
          maxWidth: 700, margin: "0 auto",
          display: "flex", alignItems: "center"
        }}>
          {STEP_LABELS.map((label, i) => {
            const done = i < current;
            const active = i === current;
            return (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "initial" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: done ? "#1E3A2F" : active ? "#1E3A2F" : "transparent",
                      border: `2px solid ${done || active ? "#1E3A2F" : "#D0CBC0"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: done || active ? "white" : "#D0CBC0",
                      fontWeight: 700, fontSize: "0.85rem", margin: "0 auto 4px"
                    }}>
                      {done ? "✓" : i + 1}
                    </div>
                    <div style={{
                      fontSize: "0.72rem", fontWeight: active ? 600 : 400,
                      color: active ? "#1E3A2F" : done ? "#1E3A2F" : "#A0998E",
                      whiteSpace: "nowrap"
                    }}>{label}</div>
                  </div>
                  {i < 3 && (
                      <div style={{
                        flex: 1, height: 2, margin: "0 0.5rem",
                        background: done ? "#1E3A2F" : "#E8E3D9",
                        marginBottom: "1.2rem"
                      }} />
                  )}
                </div>
            );
          })}
        </div>
      </div>
  );
}

// ── Step 1: Plan ─────────────────────────────────────────────────────────────
function StepPlan({ order, setOrder, onNext, dishes }: {
  order: OrderState;
  setOrder: (o: OrderState) => void;
  onNext: () => void;
  dishes: Dish[];
}) {
  const gemiddeld = dishes.length > 0
      ? dishes.reduce((sum, d) => sum + d.price_cents, 0) / dishes.length / 100
      : 0;
  const total = order.persons * order.meals_per_week * gemiddeld;

  return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.8rem", fontWeight: 700, color: "#1E3A2F",
          textAlign: "center", marginBottom: "0.5rem"
        }}>Stel jouw box samen</h1>
        <p style={{ textAlign: "center", color: "#6B7063", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Pas de porties en het aantal maaltijden aan op jouw situatie.
        </p>

        {/* Personen */}
        <div style={{
          background: "white", borderRadius: 16, padding: "1.5rem",
          border: "1px solid #E8E3D9", marginBottom: "1.2rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.2rem", color: "#6B7063", fontSize: "0.9rem" }}>
            <span>👥</span> Voor hoeveel personen kook je?
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5, 6].map(n => (
                <button key={n} onClick={() => setOrder({ ...order, persons: n })}
                        style={{
                          width: 56, height: 56, borderRadius: 12,
                          border: `2px solid ${order.persons === n ? "#1E3A2F" : "#E8E3D9"}`,
                          background: "white", fontWeight: order.persons === n ? 700 : 400,
                          color: order.persons === n ? "#1E3A2F" : "#6B7063",
                          fontSize: "1rem", cursor: "pointer"
                        }}>{n}</button>
            ))}
          </div>
        </div>

        {/* Maaltijden */}
        <div style={{
          background: "white", borderRadius: 16, padding: "1.5rem",
          border: "1px solid #E8E3D9", marginBottom: "1.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.2rem", color: "#6B7063", fontSize: "0.9rem" }}>
            <span>📅</span> Aantal maaltijden per week
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setOrder({ ...order, meals_per_week: n, selected_dish_ids: [] })}
                        style={{
                          width: 72, height: 56, borderRadius: 12,
                          border: `2px solid ${order.meals_per_week === n ? "#1E3A2F" : "#E8E3D9"}`,
                          background: "white", fontWeight: order.meals_per_week === n ? 700 : 400,
                          color: order.meals_per_week === n ? "#1E3A2F" : "#6B7063",
                          fontSize: "1rem", cursor: "pointer"
                        }}>{n}</button>
            ))}
          </div>
        </div>

        {/* Prijs + knop */}
        <div style={{
          background: "#1E3A2F", borderRadius: 16, padding: "1.2rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", marginBottom: 4 }}>Geschatte prijs per week</div>
            <div style={{ color: "white", fontSize: "1.5rem", fontWeight: 700 }}>€ {total.toFixed(2)}</div>
          </div>
          <button onClick={onNext} style={{
            background: "#C8782A", color: "white", border: "none",
            borderRadius: 50, padding: "12px 24px",
            fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
            fontFamily: "inherit"
          }}>Kies Gerechten →</button>
        </div>
      </div>
  );
}

// ── Step 2: Gerechten ────────────────────────────────────────────────────────
function StepGerechten({ order, setOrder, dishes, onNext, onBack }: {
  order: OrderState;
  setOrder: (o: OrderState) => void;
  dishes: Dish[];
  onNext: () => void;
  onBack: () => void;
}) {
  const needed = order.meals_per_week;
  const selected = order.selected_dish_ids;

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setOrder({ ...order, selected_dish_ids: selected.filter(x => x !== id) });
    } else if (selected.length < needed) {
      setOrder({ ...order, selected_dish_ids: [...selected, id] });
    }
  };

  return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.8rem", fontWeight: 700, color: "#1E3A2F",
          textAlign: "center", marginBottom: "0.5rem"
        }}>Kies je gerechten</h1>
        <p style={{ textAlign: "center", color: "#6B7063", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Selecteer {needed} maaltijden voor aankomende week. Je hebt er {selected.length} gekozen.
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.2rem", marginBottom: "2.5rem"
        }}>
          {dishes.map(dish => {
            const isSelected = selected.includes(dish.id);
            const disabled = !isSelected && selected.length >= needed;
            return (
                <div key={dish.id} onClick={() => !disabled && toggle(dish.id)}
                     style={{
                       background: "white", borderRadius: 14,
                       overflow: "hidden", cursor: disabled ? "not-allowed" : "pointer",
                       border: `2px solid ${isSelected ? "#1E3A2F" : "transparent"}`,
                       opacity: disabled ? 0.5 : 1,
                       transition: "all 0.15s",
                       boxShadow: isSelected ? "0 0 0 2px #1E3A2F20" : "0 2px 8px rgba(0,0,0,0.06)"
                     }}>
                  <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                    {dish.image_url ? (
                        <img src={dish.image_url} alt={dish.name}
                             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                        <div style={{ height: "100%", background: "#1E3A2F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>🍽️</div>
                    )}
                    {isSelected && (
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "rgba(30,58,47,0.35)",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <div style={{
                            width: 36, height: 36, background: "#1E3A2F",
                            borderRadius: "50%", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            color: "white", fontSize: "1.1rem", fontWeight: 700
                          }}>✓</div>
                        </div>
                    )}
                  </div>
                  <div style={{ padding: "0.9rem 1rem" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1A1A1A" }}>{dish.name}</div>
                  </div>
                </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", color: "#6B7063",
            cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem",
            display: "flex", alignItems: "center", gap: 6
          }}>← Terug</button>
          <button onClick={onNext} disabled={selected.length < needed}
                  style={{
                    background: selected.length >= needed ? "#C8782A" : "#E8E3D9",
                    color: selected.length >= needed ? "white" : "#A0998E",
                    border: "none", borderRadius: 50, padding: "12px 28px",
                    fontWeight: 700, fontSize: "0.9rem", cursor: selected.length >= needed ? "pointer" : "not-allowed",
                    fontFamily: "inherit"
                  }}>Verder →</button>
        </div>
      </div>
  );
}

// ── Step 3: Voorkeuren ───────────────────────────────────────────────────────
function StepVoorkeuren({ order, setOrder, onNext, onBack }: {
  order: OrderState;
  setOrder: (o: OrderState) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.8rem", fontWeight: 700, color: "#1E3A2F",
          textAlign: "center", marginBottom: "0.5rem"
        }}>Jouw voorkeuren</h1>
        <p style={{ textAlign: "center", color: "#6B7063", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Hoe wil je koken? Mekla streeft naar duurzaamheid.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "2.5rem" }}>
          {[
            { key: "digital", icon: "📱", title: "Digitaal Recept", desc: "Volg de stappen overzichtelijk via onze app of website.", badge: "🌿 Meest duurzame keuze" },
            { key: "paper", icon: "📄", title: "Papieren Kaart", desc: "Een fysieke receptenkaart meegeleverd in de box. Gedrukt op gerecycled papier.", badge: null },
          ].map(opt => (
              <div key={opt.key} onClick={() => setOrder({ ...order, recipe_format: opt.key as "digital" | "paper" })}
                   style={{
                     background: "white", borderRadius: 16, padding: "1.5rem",
                     border: `2px solid ${order.recipe_format === opt.key ? "#1E3A2F" : "#E8E3D9"}`,
                     cursor: "pointer", transition: "border-color 0.15s"
                   }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{opt.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1A1A1A", marginBottom: "0.5rem" }}>{opt.title}</div>
                <div style={{ fontSize: "0.82rem", color: "#6B7063", lineHeight: 1.5, marginBottom: opt.badge ? "0.75rem" : 0 }}>{opt.desc}</div>
                {opt.badge && <div style={{ color: "#C8782A", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>{opt.badge}</div>}
              </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", color: "#6B7063",
            cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem",
            display: "flex", alignItems: "center", gap: 6
          }}>← Terug</button>
          <button onClick={onNext} disabled={!order.recipe_format}
                  style={{
                    background: order.recipe_format ? "#E8E3D9" : "#E8E3D9",
                    color: "#A0998E", border: "none", borderRadius: 50,
                    padding: "12px 28px", fontWeight: 700, fontSize: "0.9rem",
                    cursor: order.recipe_format ? "pointer" : "not-allowed",
                    fontFamily: "inherit",
                    ...(order.recipe_format ? { background: "#C8782A", color: "white" } : {})
                  }}>Overzicht →</button>
        </div>
      </div>
  );
}

// ── Step 4: Afronden ─────────────────────────────────────────────────────────
function StepAfronden({ order, dishes, slots, onSubmit, loading, onBack }: {
  order: OrderState;
  dishes: Dish[];
  slots: Slot[];
  onSubmit: (full_name: string, address: string, email: string, slot_id: string) => void;
  loading: boolean;
  onBack: () => void;
}) {
  const [name, setName] = useState(order.full_name);
  const [address, setAddress] = useState(order.address);
  const [email, setEmail] = useState(order.email);
  const [slotId, setSlotId] = useState(order.slot_id || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedDishes = dishes.filter(d => order.selected_dish_ids.includes(d.id));
  const total = selectedDishes.reduce((sum, dish) => {
    return sum + (dish.price_cents / 100) * order.persons;
  }, 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Naam is verplicht";
    if (!email.trim() || !email.includes("@")) e.email = "Geldig e-mailadres vereist";
    if (!address.trim()) e.address = "Adres is verplicht";
    if (!slotId) e.slot = "Kies een levermoment";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(name, address, email, slotId);
  };

  const inputStyle = (field: string) => ({
    width: "100%", padding: "10px 14px",
    border: `1.5px solid ${errors[field] ? "#EF5350" : "#E8E3D9"}`,
    borderRadius: 10, fontFamily: "inherit", fontSize: "0.9rem",
    background: "#FDFAF4", outline: "none", boxSizing: "border-box" as const,
    color: "#1E3A2F",
    caretColor: "#1E3A2F",
  });

  return (
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "#F5F0E8", margin: "0 auto 1rem",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem"
          }}>✓</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.8rem", fontWeight: 700, color: "#1E3A2F", marginBottom: "0.4rem"
          }}>Klaar om te bestellen!</h1>
          <p style={{ color: "#6B7063", fontSize: "0.9rem" }}>Controleer je gegevens en rond je bestelling af.</p>
        </div>

        {/* Overzicht box */}
        <div style={{
          background: "white", borderRadius: 16, padding: "1.5rem",
          border: "1px solid #E8E3D9", marginBottom: "1.5rem"
        }}>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1A1A1A", marginBottom: "1rem" }}>Jouw Box</h3>
          {[
            { label: "Aantal personen", value: order.persons },
            { label: "Maaltijden per week", value: order.meals_per_week },
            { label: "Receptformaat", value: order.recipe_format === "digital" ? "Digitaal (App/Web)" : "Papieren Kaart" },
          ].map(row => (
              <div key={row.label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: "1px solid #F0EDE6",
                fontSize: "0.88rem"
              }}>
                <span style={{ color: "#6B7063" }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: "#1E3A2F" }}>{row.value}</span>
              </div>
          ))}

          <div style={{ marginTop: "1rem" }}>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.75rem", color: "#1E3A2F"}}>Gekozen Gerechten:</div>
            {selectedDishes.map(dish => (
                <div key={dish.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "#FDFAF4", borderRadius: 10, padding: "8px 12px", marginBottom: 6
                }}>
                  {dish.image_url && (
                      <img src={dish.image_url} alt={dish.name}
                           style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
                  )}
                  <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "#1E3A2F" }}>{dish.name}</span>
                </div>
            ))}
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: "1rem", paddingTop: "1rem",
            borderTop: "1px solid #E8E3D9"
          }}>
            <span style={{ fontSize: "0.88rem", color: "#6B7063" }}>Totaal wekelijks</span>
            <span style={{ fontWeight: 700, color: "#C8782A", fontSize: "1.1rem" }}>€ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Formulier */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#6B7063", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Naam</label>
            <input value={name} onChange={e => setName(e.target.value)} style={inputStyle("name")} placeholder="Fatima El Amrani" />
            {errors.name && <div style={{ color: "#EF5350", fontSize: "0.75rem", marginTop: 4 }}>{errors.name}</div>}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#6B7063", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>E-mail</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle("email")} placeholder="fatima@email.com" type="email" />
            {errors.email && <div style={{ color: "#EF5350", fontSize: "0.75rem", marginTop: 4 }}>{errors.email}</div>}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#6B7063", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Adres</label>
            <input value={address} onChange={e => setAddress(e.target.value)} style={inputStyle("address")} placeholder="Straat 1, Stad" />
            {errors.address && <div style={{ color: "#EF5350", fontSize: "0.75rem", marginTop: 4 }}>{errors.address}</div>}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#6B7063", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Levermoment</label>
            <select value={slotId} onChange={e => setSlotId(e.target.value)} style={{ ...inputStyle("slot"), appearance: "none" as const }}>
              <option value="">Kies een dag...</option>
              {slots.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.slot_date} · {s.start_time}–{s.end_time}
                  </option>
              ))}
            </select>
            {errors.slot && <div style={{ color: "#EF5350", fontSize: "0.75rem", marginTop: 4 }}>{errors.slot}</div>}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", color: "#6B7063",
            cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem"
          }}>← Wijzigen</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            background: "#C8782A", color: "white", border: "none",
            borderRadius: 50, padding: "13px 32px",
            fontWeight: 700, fontSize: "0.95rem", cursor: loading ? "wait" : "pointer",
            fontFamily: "inherit", opacity: loading ? 0.7 : 1
          }}>{loading ? "Bezig..." : "Afrekenen"}</button>
        </div>
      </div>
  );
}

// ── Bevestiging ──────────────────────────────────────────────────────────────
function Bevestiging({ orderId, onReset }: { orderId: string; onReset: () => void }) {
  return (
      <div style={{
        maxWidth: 500, margin: "4rem auto", padding: "2rem",
        textAlign: "center", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)"
      }}>
        <div style={{
          width: 72, height: 72, background: "#E8F5E9",
          borderRadius: "50%", margin: "0 auto 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem"
        }}>✅</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.8rem", color: "#1E3A2F", marginBottom: "0.5rem"
        }}>Bestelling geplaatst!</h1>
        <p style={{ color: "#6B7063", marginBottom: "1.5rem" }}>
          Je ontvangt een bevestiging per e-mail.
        </p>
        <div style={{
          background: "#1E3A2F", color: "white",
          borderRadius: 12, padding: "8px 24px",
          display: "inline-block", fontWeight: 700,
          letterSpacing: 1, fontSize: "0.85rem", marginBottom: "2rem"
        }}>ORDER #{orderId}</div>
        <br />
        <button onClick={onReset} style={{
          background: "#C8782A", color: "white", border: "none",
          borderRadius: 50, padding: "12px 32px",
          fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit"
        }}>Nieuwe bestelling</button>
      </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function BestellenPage() {
  const [step, setStep] = useState(0); // 0-3 = stappen, 4 = bevestiging
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [order, setOrder] = useState<OrderState>({
    persons: 2,
    meals_per_week: 3,
    selected_dish_ids: [],
    recipe_format: null,
    full_name: "",
    address: "",
    email: "",
    slot_id: null,
  });

  useEffect(() => {
    fetch("/api/menu")
        .then(r => r.json())
        .then(d => setDishes(d.dishes?.length ? d.dishes : MOCK_DISHES))
        .catch(() => setDishes(MOCK_DISHES));

    fetch("/api/slots")
        .then(r => r.json())
        .then(d => setSlots(d.slots?.length ? d.slots : MOCK_SLOTS))
        .catch(() => setSlots(MOCK_SLOTS));
  }, []);

  const handleSubmit = async (full_name: string, address: string, email: string, slot_id: string) => {
    setLoading(true);
    const payload = {
      full_name,
      address,
      slot_id,
      items: order.selected_dish_ids.map(id => ({
        dish_id: id,
        quantity: 1,
        portion_size: order.persons <= 2 ? "2p" : "4p",
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setOrderId(data.order_id || `MKL-${Date.now().toString(36).toUpperCase()}`);
    } catch {
      setOrderId(`MKL-${Date.now().toString(36).toUpperCase()}`);
    }

    setStep(4);
    setLoading(false);
  };

  if (step === 4) {
    return <Bevestiging orderId={orderId} onReset={() => { setStep(0); setOrder({ persons: 2, meals_per_week: 3, selected_dish_ids: [], recipe_format: null, full_name: "", address: "", email: "", slot_id: null }); }} />;
  }

  return (
      <div style={{ background: "#F5F0E8", minHeight: "100vh", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
        <StepBar current={step} />
        {step === 0 && <StepPlan order={order} setOrder={setOrder} onNext={() => setStep(1)} dishes={dishes} />}
        {step === 1 && <StepGerechten order={order} setOrder={setOrder} dishes={dishes} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <StepVoorkeuren order={order} setOrder={setOrder} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <StepAfronden order={order} dishes={dishes} slots={slots} onSubmit={handleSubmit} loading={loading} onBack={() => setStep(2)} />}
      </div>
  );
}