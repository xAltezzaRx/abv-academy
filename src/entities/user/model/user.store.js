import { defineStore } from "pinia";
import { userApi } from "../api/user.api";
import { useAuthStore } from "@/features/auth/model/auth.store";

export const useUserStore = defineStore("user", {
    state: () => ({
        /** @type {import("./types").UserProfile|null} */
        profile: null,
        loading: false,
        error: "",
    }),

    actions: {
        async fetchMe() {
            const auth = useAuthStore();

            if (this.loading) return;
            if (!auth.isAuth) {
                this.clear();
                return;
            }

            this.loading = true;
            this.error = "";

            try {
                this.profile = await userApi.getMe(auth.role);
            } catch (e) {
                this.error = e?.message || "Ошибка загрузки пользователя";
            } finally {
                this.loading = false;
            }
        },

        clear() {
            this.profile = null;
            this.loading = false;
            this.error = "";
        },
    },
});