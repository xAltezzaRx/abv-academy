import { useAuthStore } from "@/features/auth/model/auth.store";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

// helper для сборки URL
const buildUrl = (path) => {
    if (!baseURL) return path;
    if (path.startsWith("http")) return path;
    return `${baseURL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const api = {
    async request(path, options = {}) {
        const auth = useAuthStore();

        const res = await fetch(buildUrl(path), {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
                ...(options.headers || {}),
            },
        });

        // 401 — разлогин
        if (res.status === 401) {
            auth.logout();
            throw new Error("Unauthorized");
        }

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(text || `HTTP ${res.status}`);
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return null;

        return res.json();
    },

    get(path) {
        return this.request(path, { method: "GET" });
    },

    post(path, body) {
        return this.request(path, { method: "POST", body: JSON.stringify(body) });
    },

    put(path, body) {
        return this.request(path, { method: "PUT", body: JSON.stringify(body) });
    },

    delete(path) {
        return this.request(path, { method: "DELETE" });
    },
};
