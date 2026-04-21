export const http = async (url, options = {}) => {
    // позже сюда добавим baseURL, токены, обработку 401 и т.д.
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options,
    });

    // единообразные ошибки
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }

    // если вдруг пустой ответ
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return null;

    return res.json();
};
