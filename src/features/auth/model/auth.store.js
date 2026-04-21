import { defineStore } from "pinia";
import { storage } from "@/shared/lib/storage";

const KEY = "app_auth_v1";

export const useAuthStore = defineStore("auth", {
    state: () => {
        const saved = storage.get(KEY, null);

        return {
            isAuth: saved?.isAuth ?? true,
            role: saved?.role ?? "student",
            userId: saved?.userId ?? "demo-1",
            token: saved?.token ?? "demo-token",
        };
    },

    getters: {
        isStudent: (s) => s.role === "student",
    },

    actions: {
        _persist() {
            storage.set(KEY, {
                isAuth: this.isAuth,
                role: this.role,
                userId: this.userId,
                token: this.token,
            });
        },

        setRole(role) {
            this.role = role;
            this.isAuth = true;
            this._persist();
        },

        logout() {
            this.isAuth = false;
            this.role = null;
            this.userId = null;
            this.token = null;
            storage.remove(KEY);
        },
    },
});
