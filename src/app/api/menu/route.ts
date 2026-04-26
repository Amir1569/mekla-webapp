import { supabase } from "@/lib/supabase/client";

export async function GET() {
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
            tags
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

    if (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return Response.json({ dishes: data ?? [] });
}