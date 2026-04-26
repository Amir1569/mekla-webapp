import { supabase } from "@/lib/supabase/client";
import { requireAdmin } from "@/lib/admin";

type DishBody = {
    name?: string;
    description?: string;
    price_cents?: number;
    allergens?: string[];
    image_url?: string | null;
    cook_time?: number | null;
    spice_level?: number;
    tags?: string[];
    is_active?: boolean;
};

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

export async function GET(req: Request) {
    const admin = requireAdmin(req);
    if (!admin.ok) return admin.res;

    const { data, error } = await supabase
        .from("dishes")
        .select(`
            id,
            name,
            description,
            price_cents,
            allergens,
            image_url,
            is_active,
            cook_time,
            spice_level,
            tags,
            created_at
        `)
        .order("created_at", { ascending: false });

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ dishes: data ?? [] });
}

export async function POST(req: Request) {
    const admin = requireAdmin(req);
    if (!admin.ok) return admin.res;

    let body: DishBody;

    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!isNonEmptyString(body.name)) {
        return Response.json({ error: "name is required" }, { status: 400 });
    }

    if (typeof body.price_cents !== "number" || body.price_cents < 0) {
        return Response.json({ error: "price_cents must be a positive number" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("dishes")
        .insert({
            name: body.name.trim(),
            description: body.description?.trim() ?? "",
            price_cents: body.price_cents,
            allergens: body.allergens ?? [],
            image_url: body.image_url ?? null,
            cook_time: body.cook_time ?? null,
            spice_level: body.spice_level ?? 0,
            tags: body.tags ?? [],
            is_active: body.is_active ?? true,
        })
        .select(`
            id,
            name,
            description,
            price_cents,
            allergens,
            image_url,
            is_active,
            cook_time,
            spice_level,
            tags
        `)
        .single();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ dish: data }, { status: 201 });
}