import { defineStore } from "pinia";
import { homeworkApi } from "../api/homework.api";

export const useStudentHomeworkStore = defineStore("studentHomework", {
    state: () => ({
        /** @type {import("./types").HomeworkItem[]} */
        items: [],
        loading: false,
        error: "",
    }),

    actions: {
        async fetchHomework() {
            this.loading = true;
            this.error = "";
            try {
                this.items = await homeworkApi.getList();
            } catch (e) {
                this.error = e?.message || "Ошибка загрузки домашнего задания";
            } finally {
                this.loading = false;
            }
        },
    },
});
