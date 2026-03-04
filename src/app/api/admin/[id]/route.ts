import { supabase } from "@/lib/supabase/client";
import { requireAdmin } from "@/lib/admin";

const allowedStatuses = new Set(["new", "prep", "delivered"]);

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    const admin = requireAdmin(req);
    if (!admin.ok) return admin.res;

    const { id } = await context.params;

    let body: { status?: string };
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const status = body.status;
    if (!status || !allowedStatuses.has(status)) {
        return Response.json(
            { error: "status must be one of: new, prep, delivered" },
            { status: 400 }
        );
    }

    const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id)
        .select("id, status")
        .single();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ order: data });
}