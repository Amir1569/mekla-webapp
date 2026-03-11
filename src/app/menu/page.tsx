"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Dish = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  allergens: string[];
  image_url?: string;
  cook_time?: number;
  spice_level?: number;
  tags?: string[];
};

// Fallback mock data als de API niet beschikbaar is
const MOCK_DISHES: Dish[] = [
  { id: "1", name: "Klassieke Marokkaanse Kip Tajine", description: "Malse kip met ingelegde citroen, olijven en een rijke mix van ras el hanout kruiden. Geserveerd met luchtige couscous.", price_cents: 1250, allergens: ["gluten"], image_url: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&q=80", cook_time: 35, spice_level: 2, tags: ["Populair", "Familiefavoriet"] },
  { id: "2", name: "Thaise Groene Curry met Garnalen", description: "Pikante, romige kokoscurry vol met verse groenten, bamboescheuten en sappige halal garnalen. Inclusief pandanrijst.", price_cents: 1350, allergens: ["schaaldieren", "soja"], image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80", cook_time: 25, spice_level: 3, tags: ["Snel", "Pikant"] },
  { id: "3", name: "Turkse Adana Kebab Bowl", description: "Gekruid runder- en lamsgehakt op een bedje van bulgur, met een frisse herderssalade en knoflook-yoghurtsaus.", price_cents: 1150, allergens: ["gluten", "lactose"], image_url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", cook_time: 30, spice_level: 1, tags: ["Eiwitrijk"] },
  { id: "4", name: "Indonesische Nasi Goreng Speciaal", description: "Gebakken rijst boordevol groenten, afgetopt met een perfect gebakken eitje, kipsaté en authentieke pindasaus.", price_cents: 1100, allergens: ["pinda", "ei", "soja"], image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", cook_time: 20, spice_level: 1, tags: ["Snel", "Kids"] },
  { id: "5", name: "Libanese Mezze Salade met Falafel", description: "Knapperige huisgemaakte falafel met hummus, tabbouleh en verse pitabroodjes. Een lichte maar volle maaltijd.", price_cents: 1000, allergens: ["gluten", "sesam"], image_url: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=400&q=80", cook_time: 25, spice_level: 0, tags: ["Vegetarisch", "Licht"] },
];

function SpiceIcons({ level = 0 }: { level?: number }) {
  return (
      <span>
      {[1, 2, 3].map(i => (
          <span key={i} style={{ opacity: i <= level ? 1 : 0.2, fontSize: "0.8rem" }}>🌶</span>
      ))}
    </span>
  );
}

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
        .then(r => r.json())
        .then(data => {
          // returned { dishes: [...] }
          setDishes(data.dishes?.length ? data.dishes : MOCK_DISHES);
        })
        .catch(() => setDishes(MOCK_DISHES))
        .finally(() => setLoading(false));
  }, []);

  return (
      <div style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>

        {/* Header */}
        <section style={{
          background: "white", padding: "3rem 4rem",
          borderBottom: "1px solid #E8E3D9", textAlign: "center"
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem", fontWeight: 700, color: "#1E3A2F", marginBottom: "0.5rem"
          }}>Het menu van deze week</h1>
          <p style={{ color: "#6B7063", fontSize: "0.95rem", maxWidth: 560, margin: "0 auto" }}>
            Ontdek onze nieuwste creaties. Van vertrouwde klassiekers tot spannende nieuwe smaken. Alles vers, 100% halal en vol liefde voorbereid.
          </p>
        </section>

        {/* Dish grid */}
        <section style={{ padding: "3rem 4rem", maxWidth: 1100, margin: "0 auto" }}>
          {loading ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#6B7063" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
                Menu laden...
              </div>
          ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem"
              }}>
                {dishes.map(dish => (
                    <div key={dish.id} style={{
                      background: "white", borderRadius: 16,
                      overflow: "hidden",
                      border: "1px solid #E8E3D9",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "pointer"
                    }}
                         onMouseEnter={e => {
                           (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                           (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
                         }}
                         onMouseLeave={e => {
                           (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                           (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                         }}
                    >
                      {/* Foto */}
                      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                        {dish.image_url ? (
                            <img src={dish.image_url} alt={dish.name}
                                 style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            <div style={{
                              height: "100%", background: "#1E3A2F",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "3rem"
                            }}>🍽️</div>
                        )}
                        {/* Tags */}
                        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                          {dish.tags?.map(tag => (
                              <span key={tag} style={{
                                background: "white", color: "#1A1A1A",
                                borderRadius: 20, padding: "3px 10px",
                                fontSize: "0.72rem", fontWeight: 600,
                                boxShadow: "0 1px 6px rgba(0,0,0,0.12)"
                              }}>{tag}</span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ padding: "1.25rem" }}>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.05rem", fontWeight: 700,
                          color: "#1E3A2F", marginBottom: "0.4rem", lineHeight: 1.3
                        }}>{dish.name}</h3>
                        <p style={{ fontSize: "0.82rem", color: "#6B7063", lineHeight: 1.6, marginBottom: "0.8rem" }}>
                          {dish.description}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B7063", fontSize: "0.82rem" }}>
                            {dish.cook_time && <span>⏱ {dish.cook_time} min</span>}
                            <SpiceIcons level={dish.spice_level} />
                          </div>
                          <span style={{ fontWeight: 700, color: "#1E3A2F", fontSize: "0.95rem" }}>
                      €{(dish.price_cents / 100).toFixed(2)}<span style={{ fontWeight: 400, color: "#6B7063", fontSize: "0.75rem" }}>/p</span>
                    </span>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/bestellen" style={{
              background: "#C8782A", color: "white",
              borderRadius: "50px", padding: "14px 36px",
              textDecoration: "none", fontWeight: 700, fontSize: "1rem",
              display: "inline-block"
            }}>Stel je box samen →</Link>
          </div>
        </section>
      </div>
  );
}