import { defineStore } from "pinia";
import { profileApi } from "../api/profile.api";

export const useStudentProfileStore = defineStore("studentProfile", {
    state: () => ({
        /** @type {import("./types").StudentProfile|null} */
        data: null,
        loading: false,
        error: "",
    }),

    actions: {
        async fetchProfile() {
            this.loading = true;
            this.error = "";
            try {
                this.data = await profileApi.getProfile();
            } catch (e) {
                this.error = e?.message || "Ошибка загрузки профиля";
            } finally {
                this.loading = false;
            }
        },
    },
});
