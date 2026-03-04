import { supabase } from "@/lib/supabase/client";

type OrderItemInput = {
    dish_id: string;
    quantity: number;
    portion_size: "2p" | "4p";
};

type CreateOrderBody = {
    full_name: string;
    address: string;
    slot_id: string | null;
    items: OrderItemInput[];
};

function isNonEmptyString(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
    let body: CreateOrderBody;

    try {
        body = (await req.json()) as CreateOrderBody;
    } catch {
        return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Basic validation
    if (!isNonEmptyString(body.full_name)) {
        return Response.json({ error: "full_name is required" }, { status: 400 });
    }
    if (!isNonEmptyString(body.address)) {
        return Response.json({ error: "address is required" }, { status: 400 });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
        return Response.json({ error: "items must be a non-empty array" }, { status: 400 });
    }

    for (const it of body.items) {
        if (!isNonEmptyString(it.dish_id)) {
            return Response.json({ error: "each item needs dish_id" }, { status: 400 });
        }
        if (typeof it.quantity !== "number" || it.quantity < 1) {
            return Response.json({ error: "quantity must be >= 1" }, { status: 400 });
        }
        if (it.portion_size !== "2p" && it.portion_size !== "4p") {
            return Response.json({ error: "portion_size must be '2p' or '4p'" }, { status: 400 });
        }
    }

    // 1) create order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            full_name: body.full_name,
            address: body.address,
            slot_id: body.slot_id,
            status: "new",
            user_id: null, // later: koppelen aan ingelogde user
        })
        .select("id, status, created_at")
        .single();

    if (orderError || !order) {
        return Response.json({ error: orderError?.message ?? "Failed to create order" }, { status: 500 });
    }

    // 2) create items
    const itemsToInsert = body.items.map((it) => ({
        order_id: order.id,
        dish_id: it.dish_id,
        quantity: it.quantity,
        portion_size: it.portion_size,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);

    if (itemsError) {
        // rollback order if items fail
        await supabase.from("orders").delete().eq("id", order.id);
        return Response.json({ error: itemsError.message }, { status: 500 });
    }

    return Response.json({ order_id: order.id, status: order.status }, { status: 201 });
}