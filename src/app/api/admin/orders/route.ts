import { supabase } from "@/lib/supabase/client";
import { requireAdmin } from "@/lib/admin";

export async function GET(req: Request) {
    const admin = requireAdmin(req);
    if (!admin.ok) return admin.res;

    const url = new URL(req.url);
    const date = url.searchParams.get("date"); // optional: YYYY-MM-DD
    const status = url.searchParams.get("status"); // optional: new|prep|delivered

    // Base query: orders + slot + items + dish name
    let query = supabase
        .from("orders")
        .select(`
      id,
      full_name,
      address,
      status,
      created_at,
      slot_id,
      delivery_slots ( slot_date, start_time, end_time ),
      order_items (
        id,
        dish_id,
        quantity,
        portion_size,
        dishes ( name, price_cents )
      )
    `)
        .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);

    // filter by slot_date if date given
    // We filter on delivery_slots.slot_date via "delivery_slots!inner"
    // Simplest approach: fetch and filter in code if needed.
    const { data, error } = await query;

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    const orders = (data ?? []).filter((o: any) => {
        if (!date) return true;
        const slotDate = o?.delivery_slots?.slot_date;
        return slotDate === date;
    });

    return Response.json({ orders });
}