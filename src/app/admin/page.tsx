"use client";

import { useEffect, useState } from "react";

type AdminStatus = "new" | "prep" | "delivered";
type AdminTab = "orders" | "dishes";

type AdminOrderItem = {
    id: string;
    dish_id: string;
    quantity: number;
    portion_size: "2p" | "4p";
    dishes?: {
        name: string;
        price_cents: number;
    } | null;
};

type AdminOrder = {
    id: string;
    full_name: string;
    address: string;
    status: AdminStatus;
    created_at: string;
    slot_id: string | null;
    delivery_slots?: {
        slot_date: string;
        start_time: string;
        end_time: string;
    } | null;
    order_items?: AdminOrderItem[];
};

type AdminDish = {
    id: string;
    name: string;
    description: string;
    price_cents: number;
    allergens: string[];
    image_url?: string | null;
    is_active: boolean;
    cook_time?: number | null;
    spice_level?: number | null;
    tags?: string[];
    created_at?: string;
};

type DishFormState = {
    name: string;
    description: string;
    price: string;
    allergens: string;
    image_url: string;
    cook_time: string;
    spice_level: string;
    tags: string;
};

const emptyDishForm: DishFormState = {
    name: "",
    description: "",
    price: "",
    allergens: "",
    image_url: "",
    cook_time: "",
    spice_level: "0",
    tags: "",
};

const statusLabels: Record<AdminStatus, string> = {
    new: "Nieuw",
    prep: "In voorbereiding",
    delivered: "Geleverd",
};

const statusColors: Record<AdminStatus, { bg: string; text: string }> = {
    new: { bg: "#FFF3E0", text: "#C8782A" },
    prep: { bg: "#E3F2FD", text: "#1565C0" },
    delivered: { bg: "#E8F5E9", text: "#1E3A2F" },
};

function formatDateTime(value: string) {
    try {
        return new Intl.DateTimeFormat("nl-BE", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(value));
    } catch {
        return value;
    }
}

function formatPrice(cents: number) {
    return `€ ${(cents / 100).toFixed(2)}`;
}

function splitCommaList(value: string) {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

export default function AdminPage() {
    const [adminKey, setAdminKey] = useState("");
    const [activeTab, setActiveTab] = useState<AdminTab>("orders");

    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [dishes, setDishes] = useState<AdminDish[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [statusFilter, setStatusFilter] = useState<"all" | AdminStatus>("all");
    const [dishFilter, setDishFilter] = useState<"all" | "active" | "inactive">("all");

    const [dishForm, setDishForm] = useState<DishFormState>(emptyDishForm);

    useEffect(() => {
        const savedKey = sessionStorage.getItem("mekla_admin_key");
        if (savedKey) {
            setAdminKey(savedKey);
        }
    }, []);

    async function fetchOrders(key = adminKey) {
        if (!key.trim()) {
            setError("Vul eerst de admin key in.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const url =
                statusFilter === "all"
                    ? "/api/admin/orders"
                    : `/api/admin/orders?status=${statusFilter}`;

            const res = await fetch(url, {
                headers: {
                    "x-admin-key": key,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Kon bestellingen niet ophalen.");
            }

            setOrders(data.orders ?? []);
            sessionStorage.setItem("mekla_admin_key", key);
        } catch (err) {
            setOrders([]);
            setError(err instanceof Error ? err.message : "Er ging iets mis.");
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(orderId: string, status: AdminStatus) {
        setError("");
        setSuccess("");

        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Status aanpassen is mislukt.");
            }

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status } : order
                )
            );

            setSuccess("Orderstatus succesvol aangepast.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Er ging iets mis.");
        }
    }

    async function fetchDishes(key = adminKey) {
        if (!key.trim()) {
            setError("Vul eerst de admin key in.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/admin/dishes", {
                headers: {
                    "x-admin-key": key,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Kon gerechten niet ophalen.");
            }

            setDishes(data.dishes ?? []);
            sessionStorage.setItem("mekla_admin_key", key);
        } catch (err) {
            setDishes([]);
            setError(err instanceof Error ? err.message : "Er ging iets mis.");
        } finally {
            setLoading(false);
        }
    }

    async function createDish() {
        setError("");
        setSuccess("");

        if (!dishForm.name.trim()) {
            setError("Naam van het gerecht is verplicht.");
            return;
        }

        const priceNumber = Number(dishForm.price.replace(",", "."));

        if (Number.isNaN(priceNumber) || priceNumber < 0) {
            setError("Vul een geldige prijs in, bijvoorbeeld 12.50.");
            return;
        }

        const cookTimeNumber = dishForm.cook_time.trim()
            ? Number(dishForm.cook_time)
            : null;

        const spiceNumber = Number(dishForm.spice_level || 0);

        const payload = {
            name: dishForm.name.trim(),
            description: dishForm.description.trim(),
            price_cents: Math.round(priceNumber * 100),
            allergens: splitCommaList(dishForm.allergens),
            image_url: dishForm.image_url.trim() || null,
            cook_time: cookTimeNumber,
            spice_level: spiceNumber,
            tags: splitCommaList(dishForm.tags),
            is_active: true,
        };

        setLoading(true);

        try {
            const res = await fetch("/api/admin/dishes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gerecht toevoegen is mislukt.");
            }

            setDishes((prev) => [data.dish, ...prev]);
            setDishForm(emptyDishForm);
            setSuccess("Gerecht succesvol toegevoegd.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Er ging iets mis.");
        } finally {
            setLoading(false);
        }
    }

    async function toggleDishActive(dish: AdminDish) {
        setError("");
        setSuccess("");

        try {
            const res = await fetch(`/api/admin/dishes/${dish.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({ is_active: !dish.is_active }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gerecht aanpassen is mislukt.");
            }

            setDishes((prev) =>
                prev.map((d) => (d.id === dish.id ? data.dish : d))
            );

            setSuccess(
                dish.is_active
                    ? "Gerecht gedeactiveerd. Het verschijnt niet meer in het menu."
                    : "Gerecht opnieuw geactiveerd."
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : "Er ging iets mis.");
        }
    }

    function loadCurrentTab() {
        if (activeTab === "orders") {
            fetchOrders();
        } else {
            fetchDishes();
        }
    }

    const filteredDishes = dishes.filter((dish) => {
        if (dishFilter === "active") return dish.is_active;
        if (dishFilter === "inactive") return !dish.is_active;
        return true;
    });

    const totalOrders = orders.length;
    const newOrders = orders.filter((o) => o.status === "new").length;
    const prepOrders = orders.filter((o) => o.status === "prep").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

    const activeDishes = dishes.filter((d) => d.is_active).length;
    const inactiveDishes = dishes.filter((d) => !d.is_active).length;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#F5F0E8",
                fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                padding: "3rem 4rem",
            }}
        >
            <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <section
                    style={{
                        background: "#1E3A2F",
                        borderRadius: 24,
                        padding: "2.5rem",
                        marginBottom: "2rem",
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            right: -80,
                            top: -80,
                            width: 240,
                            height: 240,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.05)",
                        }}
                    />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div
                            style={{
                                display: "inline-block",
                                border: "1px solid rgba(255,255,255,0.3)",
                                borderRadius: 20,
                                padding: "5px 14px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.8)",
                                marginBottom: "1rem",
                            }}
                        >
                            Admin Dashboard
                        </div>

                        <h1
                            style={{
                                fontFamily: "'Playfair Display', var(--font-playfair), serif",
                                fontSize: "2.3rem",
                                margin: 0,
                                marginBottom: "0.75rem",
                            }}
                        >
                            Mekla beheer
                        </h1>

                        <p
                            style={{
                                maxWidth: 650,
                                color: "rgba(255,255,255,0.75)",
                                lineHeight: 1.6,
                                margin: 0,
                            }}
                        >
                            Beheer bestellingen, volg orderstatussen op en pas het weekmenu aan
                            zonder rechtstreeks in Supabase te werken.
                        </p>
                    </div>
                </section>

                <section
                    style={{
                        background: "white",
                        border: "1px solid #E8E3D9",
                        borderRadius: 18,
                        padding: "1.5rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "1rem",
                            color: "#1E3A2F",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Admin toegang
                    </h2>

                    <p
                        style={{
                            fontSize: "0.88rem",
                            color: "#6B7063",
                            marginBottom: "1rem",
                            lineHeight: 1.5,
                        }}
                    >
                        Vul de admin key in om gegevens op te halen. Lokaal is dit de waarde
                        van <strong>ADMIN_API_KEY</strong> uit jouw <strong>.env.local</strong>.
                    </p>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <input
                            type="password"
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                            placeholder="Admin key"
                            style={{
                                flex: "1 1 280px",
                                padding: "12px 14px",
                                borderRadius: 12,
                                border: "1.5px solid #E8E3D9",
                                background: "#FDFAF4",
                                outline: "none",
                                color: "#1E3A2F",
                                fontFamily: "inherit",
                            }}
                        />

                        <button
                            onClick={loadCurrentTab}
                            disabled={loading}
                            style={{
                                background: "#C8782A",
                                color: "white",
                                border: "none",
                                borderRadius: 50,
                                padding: "12px 24px",
                                fontWeight: 700,
                                cursor: loading ? "wait" : "pointer",
                                opacity: loading ? 0.7 : 1,
                                fontFamily: "inherit",
                            }}
                        >
                            {loading ? "Laden..." : "Gegevens ophalen"}
                        </button>
                    </div>

                    {error && (
                        <div
                            style={{
                                marginTop: "1rem",
                                background: "#FFEBEE",
                                color: "#C62828",
                                padding: "10px 12px",
                                borderRadius: 10,
                                fontSize: "0.85rem",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {success && (
                        <div
                            style={{
                                marginTop: "1rem",
                                background: "#E8F5E9",
                                color: "#1E3A2F",
                                padding: "10px 12px",
                                borderRadius: 10,
                                fontSize: "0.85rem",
                            }}
                        >
                            {success}
                        </div>
                    )}
                </section>

                <section
                    style={{
                        display: "flex",
                        gap: "0.75rem",
                        marginBottom: "1.5rem",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={() => setActiveTab("orders")}
                        style={{
                            background: activeTab === "orders" ? "#1E3A2F" : "white",
                            color: activeTab === "orders" ? "white" : "#1E3A2F",
                            border: "1px solid #E8E3D9",
                            borderRadius: 50,
                            padding: "11px 22px",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                    >
                        Bestellingen
                    </button>

                    <button
                        onClick={() => setActiveTab("dishes")}
                        style={{
                            background: activeTab === "dishes" ? "#1E3A2F" : "white",
                            color: activeTab === "dishes" ? "white" : "#1E3A2F",
                            border: "1px solid #E8E3D9",
                            borderRadius: 50,
                            padding: "11px 22px",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                    >
                        Menu beheren
                    </button>
                </section>

                {activeTab === "orders" ? (
                    <>
                        <section
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                                gap: "1rem",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {[
                                { label: "Totaal", value: totalOrders },
                                { label: "Nieuw", value: newOrders },
                                { label: "In voorbereiding", value: prepOrders },
                                { label: "Geleverd", value: deliveredOrders },
                            ].map((card) => (
                                <div
                                    key={card.label}
                                    style={{
                                        background: "white",
                                        border: "1px solid #E8E3D9",
                                        borderRadius: 16,
                                        padding: "1.2rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "0.78rem",
                                            color: "#6B7063",
                                            marginBottom: "0.35rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {card.label}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "1.8rem",
                                            fontWeight: 700,
                                            color: "#1E3A2F",
                                        }}
                                    >
                                        {card.value}
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section
                            style={{
                                background: "white",
                                border: "1px solid #E8E3D9",
                                borderRadius: 18,
                                padding: "1.5rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "1.5rem",
                                    flexWrap: "wrap",
                                }}
                            >
                                <div>
                                    <h2
                                        style={{
                                            fontFamily:
                                                "'Playfair Display', var(--font-playfair), serif",
                                            color: "#1E3A2F",
                                            fontSize: "1.5rem",
                                            margin: 0,
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        Bestellingen
                                    </h2>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#6B7063",
                                            fontSize: "0.88rem",
                                        }}
                                    >
                                        Overzicht van alle geplaatste orders.
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "0.75rem",
                                        alignItems: "center",
                                    }}
                                >
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value as "all" | AdminStatus)
                                        }
                                        style={{
                                            padding: "10px 14px",
                                            borderRadius: 12,
                                            border: "1.5px solid #E8E3D9",
                                            background: "#FDFAF4",
                                            color: "#1E3A2F",
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        <option value="all">Alle statussen</option>
                                        <option value="new">Nieuw</option>
                                        <option value="prep">In voorbereiding</option>
                                        <option value="delivered">Geleverd</option>
                                    </select>

                                    <button
                                        onClick={() => fetchOrders()}
                                        style={{
                                            background: "#1E3A2F",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 50,
                                            padding: "10px 18px",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div
                                    style={{
                                        padding: "3rem",
                                        textAlign: "center",
                                        color: "#6B7063",
                                    }}
                                >
                                    Bestellingen laden...
                                </div>
                            ) : orders.length === 0 ? (
                                <div
                                    style={{
                                        padding: "3rem",
                                        textAlign: "center",
                                        color: "#6B7063",
                                        background: "#FDFAF4",
                                        borderRadius: 14,
                                    }}
                                >
                                    Geen bestellingen gevonden.
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                    }}
                                >
                                    {orders.map((order) => {
                                        const statusStyle =
                                            statusColors[order.status] ?? statusColors.new;

                                        return (
                                            <article
                                                key={order.id}
                                                style={{
                                                    border: "1px solid #E8E3D9",
                                                    borderRadius: 16,
                                                    padding: "1.2rem",
                                                    background: "#FDFAF4",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "flex-start",
                                                        gap: "1rem",
                                                        marginBottom: "1rem",
                                                    }}
                                                >
                                                    <div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "0.75rem",
                                                                flexWrap: "wrap",
                                                                marginBottom: "0.4rem",
                                                            }}
                                                        >
                                                            <strong style={{ color: "#1E3A2F" }}>
                                                                {order.full_name}
                                                            </strong>

                                                            <span
                                                                style={{
                                                                    background: statusStyle.bg,
                                                                    color: statusStyle.text,
                                                                    borderRadius: 999,
                                                                    padding: "4px 10px",
                                                                    fontSize: "0.75rem",
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {statusLabels[order.status] ??
                                                                    order.status}
                                                            </span>
                                                        </div>

                                                        <div
                                                            style={{
                                                                color: "#6B7063",
                                                                fontSize: "0.85rem",
                                                                lineHeight: 1.6,
                                                            }}
                                                        >
                                                            <div>📍 {order.address}</div>
                                                            <div>
                                                                🕒 Geplaatst op{" "}
                                                                {formatDateTime(order.created_at)}
                                                            </div>
                                                            {order.delivery_slots && (
                                                                <div>
                                                                    🚚 Levering:{" "}
                                                                    {order.delivery_slots.slot_date} ·{" "}
                                                                    {order.delivery_slots.start_time}–
                                                                    {order.delivery_slots.end_time}
                                                                </div>
                                                            )}
                                                            <div style={{ opacity: 0.75 }}>
                                                                Order ID: {order.id}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            updateStatus(
                                                                order.id,
                                                                e.target.value as AdminStatus
                                                            )
                                                        }
                                                        style={{
                                                            padding: "10px 12px",
                                                            borderRadius: 12,
                                                            border: "1.5px solid #E8E3D9",
                                                            background: "white",
                                                            color: "#1E3A2F",
                                                            fontFamily: "inherit",
                                                            minWidth: 180,
                                                        }}
                                                    >
                                                        <option value="new">Nieuw</option>
                                                        <option value="prep">In voorbereiding</option>
                                                        <option value="delivered">Geleverd</option>
                                                    </select>
                                                </div>

                                                <div
                                                    style={{
                                                        background: "white",
                                                        borderRadius: 12,
                                                        padding: "0.9rem",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontWeight: 700,
                                                            color: "#1E3A2F",
                                                            fontSize: "0.9rem",
                                                            marginBottom: "0.6rem",
                                                        }}
                                                    >
                                                        Gerechten
                                                    </div>

                                                    {order.order_items &&
                                                    order.order_items.length > 0 ? (
                                                        order.order_items.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    gap: "1rem",
                                                                    padding: "7px 0",
                                                                    borderBottom: "1px solid #F0EDE6",
                                                                    fontSize: "0.86rem",
                                                                }}
                                                            >
                                                                <span style={{ color: "#1E3A2F" }}>
                                                                    {item.quantity}x{" "}
                                                                    {item.dishes?.name ??
                                                                        "Onbekend gerecht"}{" "}
                                                                    ({item.portion_size})
                                                                </span>
                                                                <span style={{ color: "#6B7063" }}>
                                                                    {item.dishes?.price_cents
                                                                        ? formatPrice(
                                                                            item.dishes.price_cents
                                                                        )
                                                                        : "-"}
                                                                </span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div
                                                            style={{
                                                                color: "#6B7063",
                                                                fontSize: "0.85rem",
                                                            }}
                                                        >
                                                            Geen gerechten gevonden voor deze bestelling.
                                                        </div>
                                                    )}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </>
                ) : (
                    <>
                        <section
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                                gap: "1rem",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {[
                                { label: "Totaal gerechten", value: dishes.length },
                                { label: "Actief", value: activeDishes },
                                { label: "Inactief", value: inactiveDishes },
                            ].map((card) => (
                                <div
                                    key={card.label}
                                    style={{
                                        background: "white",
                                        border: "1px solid #E8E3D9",
                                        borderRadius: 16,
                                        padding: "1.2rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "0.78rem",
                                            color: "#6B7063",
                                            marginBottom: "0.35rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {card.label}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "1.8rem",
                                            fontWeight: 700,
                                            color: "#1E3A2F",
                                        }}
                                    >
                                        {card.value}
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section
                            style={{
                                background: "white",
                                border: "1px solid #E8E3D9",
                                borderRadius: 18,
                                padding: "1.5rem",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily:
                                        "'Playfair Display', var(--font-playfair), serif",
                                    color: "#1E3A2F",
                                    fontSize: "1.5rem",
                                    margin: 0,
                                    marginBottom: "0.25rem",
                                }}
                            >
                                Nieuw gerecht toevoegen
                            </h2>

                            <p
                                style={{
                                    color: "#6B7063",
                                    fontSize: "0.88rem",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Voeg een gerecht toe aan het Mekla-menu. Allergenen en tags kan
                                je scheiden met komma’s.
                            </p>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                    gap: "1rem",
                                }}
                            >
                                <input
                                    value={dishForm.name}
                                    onChange={(e) =>
                                        setDishForm({ ...dishForm, name: e.target.value })
                                    }
                                    placeholder="Naam gerecht"
                                    style={inputStyle}
                                />

                                <input
                                    value={dishForm.price}
                                    onChange={(e) =>
                                        setDishForm({ ...dishForm, price: e.target.value })
                                    }
                                    placeholder="Prijs bv. 12.50"
                                    style={inputStyle}
                                />

                                <input
                                    value={dishForm.allergens}
                                    onChange={(e) =>
                                        setDishForm({ ...dishForm, allergens: e.target.value })
                                    }
                                    placeholder="Allergenen bv. gluten, melk"
                                    style={inputStyle}
                                />

                                <input
                                    value={dishForm.tags}
                                    onChange={(e) =>
                                        setDishForm({ ...dishForm, tags: e.target.value })
                                    }
                                    placeholder="Tags bv. Populair, Familie"
                                    style={inputStyle}
                                />

                                <input
                                    value={dishForm.cook_time}
                                    onChange={(e) =>
                                        setDishForm({ ...dishForm, cook_time: e.target.value })
                                    }
                                    placeholder="Kooktijd in minuten"
                                    style={inputStyle}
                                />

                                <select
                                    value={dishForm.spice_level}
                                    onChange={(e) =>
                                        setDishForm({
                                            ...dishForm,
                                            spice_level: e.target.value,
                                        })
                                    }
                                    style={inputStyle}
                                >
                                    <option value="0">Niet pikant</option>
                                    <option value="1">Licht pikant</option>
                                    <option value="2">Pikant</option>
                                    <option value="3">Heel pikant</option>
                                </select>

                                <input
                                    value={dishForm.image_url}
                                    onChange={(e) =>
                                        setDishForm({ ...dishForm, image_url: e.target.value })
                                    }
                                    placeholder="Afbeelding URL"
                                    style={{
                                        ...inputStyle,
                                        gridColumn: "1 / -1",
                                    }}
                                />

                                <textarea
                                    value={dishForm.description}
                                    onChange={(e) =>
                                        setDishForm({
                                            ...dishForm,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Beschrijving"
                                    style={{
                                        ...inputStyle,
                                        minHeight: 90,
                                        resize: "vertical",
                                        gridColumn: "1 / -1",
                                    }}
                                />
                            </div>

                            <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
                                <button
                                    onClick={createDish}
                                    disabled={loading}
                                    style={{
                                        background: "#C8782A",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 50,
                                        padding: "12px 24px",
                                        fontWeight: 700,
                                        cursor: loading ? "wait" : "pointer",
                                        opacity: loading ? 0.7 : 1,
                                        fontFamily: "inherit",
                                    }}
                                >
                                    Gerecht toevoegen
                                </button>

                                <button
                                    onClick={() => setDishForm(emptyDishForm)}
                                    style={{
                                        background: "#F5F0E8",
                                        color: "#1E3A2F",
                                        border: "1px solid #E8E3D9",
                                        borderRadius: 50,
                                        padding: "12px 20px",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                    }}
                                >
                                    Leegmaken
                                </button>
                            </div>
                        </section>

                        <section
                            style={{
                                background: "white",
                                border: "1px solid #E8E3D9",
                                borderRadius: 18,
                                padding: "1.5rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "1.5rem",
                                    flexWrap: "wrap",
                                }}
                            >
                                <div>
                                    <h2
                                        style={{
                                            fontFamily:
                                                "'Playfair Display', var(--font-playfair), serif",
                                            color: "#1E3A2F",
                                            fontSize: "1.5rem",
                                            margin: 0,
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        Menu beheren
                                    </h2>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#6B7063",
                                            fontSize: "0.88rem",
                                        }}
                                    >
                                        Zet gerechten actief of inactief. Inactieve gerechten
                                        verschijnen niet meer op de klantpagina.
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "0.75rem",
                                        alignItems: "center",
                                    }}
                                >
                                    <select
                                        value={dishFilter}
                                        onChange={(e) =>
                                            setDishFilter(
                                                e.target.value as "all" | "active" | "inactive"
                                            )
                                        }
                                        style={inputStyle}
                                    >
                                        <option value="all">Alle gerechten</option>
                                        <option value="active">Actief</option>
                                        <option value="inactive">Inactief</option>
                                    </select>

                                    <button
                                        onClick={() => fetchDishes()}
                                        style={{
                                            background: "#1E3A2F",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 50,
                                            padding: "10px 18px",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div
                                    style={{
                                        padding: "3rem",
                                        textAlign: "center",
                                        color: "#6B7063",
                                    }}
                                >
                                    Gerechten laden...
                                </div>
                            ) : filteredDishes.length === 0 ? (
                                <div
                                    style={{
                                        padding: "3rem",
                                        textAlign: "center",
                                        color: "#6B7063",
                                        background: "#FDFAF4",
                                        borderRadius: 14,
                                    }}
                                >
                                    Geen gerechten gevonden.
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(280px, 1fr))",
                                        gap: "1rem",
                                    }}
                                >
                                    {filteredDishes.map((dish) => (
                                        <article
                                            key={dish.id}
                                            style={{
                                                background: "#FDFAF4",
                                                border: "1px solid #E8E3D9",
                                                borderRadius: 16,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    height: 160,
                                                    background: "#1E3A2F",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {dish.image_url ? (
                                                    <img
                                                        src={dish.image_url}
                                                        alt={dish.name}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            height: "100%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "white",
                                                            fontSize: "2.5rem",
                                                        }}
                                                    >
                                                        🍽️
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ padding: "1rem" }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        gap: "0.75rem",
                                                        marginBottom: "0.5rem",
                                                        alignItems: "flex-start",
                                                    }}
                                                >
                                                    <h3
                                                        style={{
                                                            margin: 0,
                                                            color: "#1E3A2F",
                                                            fontSize: "1rem",
                                                            lineHeight: 1.3,
                                                        }}
                                                    >
                                                        {dish.name}
                                                    </h3>

                                                    <span
                                                        style={{
                                                            background: dish.is_active
                                                                ? "#E8F5E9"
                                                                : "#FFEBEE",
                                                            color: dish.is_active
                                                                ? "#1E3A2F"
                                                                : "#C62828",
                                                            borderRadius: 999,
                                                            padding: "4px 9px",
                                                            fontSize: "0.72rem",
                                                            fontWeight: 700,
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {dish.is_active ? "Actief" : "Inactief"}
                                                    </span>
                                                </div>

                                                <p
                                                    style={{
                                                        color: "#6B7063",
                                                        fontSize: "0.84rem",
                                                        lineHeight: 1.5,
                                                        minHeight: 42,
                                                    }}
                                                >
                                                    {dish.description || "Geen beschrijving."}
                                                </p>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: "0.4rem",
                                                        marginBottom: "0.75rem",
                                                    }}
                                                >
                                                    {dish.tags?.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            style={{
                                                                background: "white",
                                                                border: "1px solid #E8E3D9",
                                                                color: "#6B7063",
                                                                borderRadius: 999,
                                                                padding: "3px 8px",
                                                                fontSize: "0.72rem",
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        color: "#6B7063",
                                                        fontSize: "0.82rem",
                                                        marginBottom: "0.9rem",
                                                    }}
                                                >
                                                    <span>{dish.cook_time ?? "-"} min</span>
                                                    <span>{dish.spice_level ?? 0}/3 pikant</span>
                                                    <strong style={{ color: "#1E3A2F" }}>
                                                        {formatPrice(dish.price_cents)}
                                                    </strong>
                                                </div>

                                                <button
                                                    onClick={() => toggleDishActive(dish)}
                                                    style={{
                                                        width: "100%",
                                                        background: dish.is_active
                                                            ? "#FFEBEE"
                                                            : "#E8F5E9",
                                                        color: dish.is_active ? "#C62828" : "#1E3A2F",
                                                        border: "none",
                                                        borderRadius: 50,
                                                        padding: "10px 14px",
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                        fontFamily: "inherit",
                                                    }}
                                                >
                                                    {dish.is_active
                                                        ? "Deactiveren"
                                                        : "Opnieuw activeren"}
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    padding: "11px 13px",
    borderRadius: 12,
    border: "1.5px solid #E8E3D9",
    background: "#FDFAF4",
    color: "#1E3A2F",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
};