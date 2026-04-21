import { defineStore } from "pinia";
import { gradesApi } from "../api/grades.api";

export const useStudentGradesStore = defineStore("studentGrades", {
    state: () => ({
        /** @type {import("./types").GradeRow[]} */
        items: [],
        loading: false,
        error: "",
    }),

    actions: {
        async fetchGrades() {
            this.loading = true;
            this.error = "";
            try {
                this.items = await gradesApi.getSummary();
            } catch (e) {
                this.error = e?.message || "Ошибка загрузки ведомости";
            } finally {
                this.loading = false;
            }
        },
    },
});
