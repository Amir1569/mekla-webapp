import { supabase } from "@/lib/supabase/client";
import { requireAdmin } from "@/lib/admin";

type DishUpdateBody = {
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

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const admin = requireAdmin(req);
    if (!admin.ok) return admin.res;

    const { id } = await context.params;

    let body: DishUpdateBody;

    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const updates: DishUpdateBody = {};

    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.description !== undefined) updates.description = body.description.trim();
    if (body.price_cents !== undefined) updates.price_cents = body.price_cents;
    if (body.allergens !== undefined) updates.allergens = body.allergens;
    if (body.image_url !== undefined) updates.image_url = body.image_url;
    if (body.cook_time !== undefined) updates.cook_time = body.cook_time;
    if (body.spice_level !== undefined) updates.spice_level = body.spice_level;
    if (body.tags !== undefined) updates.tags = body.tags;
    if (body.is_active !== undefined) updates.is_active = body.is_active;

    const { data, error } = await supabase
        .from("dishes")
        .update(updates)
        .eq("id", id)
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

    return Response.json({ dish: data });
}