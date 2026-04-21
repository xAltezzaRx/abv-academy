import { defineStore } from "pinia";
import { scheduleApi } from "../api/schedule.api";

export const useStudentScheduleStore = defineStore("studentSchedule", {
    state: () => ({
        /** @type {import("./types").ScheduleDay[]} */
        days: [],
        loading: false,
        error: "",
    }),

    actions: {
        async fetchSchedule() {
            this.loading = true;
            this.error = "";
            try {
                this.days = await scheduleApi.getWeek();
            } catch (e) {
                this.error = e?.message || "Ошибка загрузки расписания";
            } finally {
                this.loading = false;
            }
        },
    },
});
