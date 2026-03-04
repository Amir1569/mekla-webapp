export function requireAdmin(req: Request): { ok: true } | { ok: false; res: Response } {
    const expected = process.env.ADMIN_API_KEY;

    // Als je geen key gezet hebt, blokkeren we (veilig)
    if (!expected) {
        return {
            ok: false,
            res: Response.json(
                { error: "ADMIN_API_KEY is not configured on server" },
                { status: 500 }
            ),
        };
    }

    const provided = req.headers.get("x-admin-key");

    if (!provided || provided !== expected) {
        return {
            ok: false,
            res: Response.json({ error: "Unauthorized" }, { status: 401 }),
        };
    }

    return { ok: true };
}