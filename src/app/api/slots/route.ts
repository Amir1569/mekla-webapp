import { supabase } from "@/lib/supabase/client";

export async function GET() {
    const { data, error } = await supabase
        .from("delivery_slots")
        .select("id, slot_date, start_time, end_time, capacity")
        .order("slot_date", { ascending: true })
        .order("start_time", { ascending: true });

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ slots: data ?? [] });
}