const allowedEvents = new Set([
    "page_viewed",
    "product_searched",
    "product_opened",
    "favorite_added",
    "favorite_removed",
    "barcode_generated",
    "barcode_printed",
    "bakery_view_opened",
    "favorites_view_opened",
    "image_opened"
]);

function firstHeader(request, name) {
    const value = request.headers[name];
    return typeof value === "string" && value.trim() ? value.trim().slice(0, 120) : null;
}

module.exports = function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).json({ error: "Method not allowed" });
    }

    const body = request.body && typeof request.body === "object" ? request.body : {};
    const event = typeof body.event === "string" ? body.event : "";
    if (!allowedEvents.has(event)) {
        return response.status(400).json({ error: "Unknown event" });
    }

    const data = body.data && typeof body.data === "object" ? body.data : {};
    const record = {
        event,
        data,
        session_id: typeof body.session_id === "string" ? body.session_id.slice(0, 64) : null,
        page: typeof body.page === "string" ? body.page.slice(0, 120) : null,
        user_agent: firstHeader(request, "user-agent"),
        referer: firstHeader(request, "referer"),
        language: typeof body.language === "string" ? body.language.slice(0, 32) : null,
        timezone: typeof body.timezone === "string" ? body.timezone.slice(0, 64) : null,
        viewport: body.viewport && typeof body.viewport === "object"
            ? { width: Number(body.viewport.width) || 0, height: Number(body.viewport.height) || 0 }
            : null,
        country: firstHeader(request, "x-vercel-ip-country"),
        region: firstHeader(request, "x-vercel-ip-country-region"),
        city: firstHeader(request, "x-vercel-ip-city"),
        received_at: new Date().toISOString()
    };

    console.log(JSON.stringify(record));
    return response.status(204).end();
}
