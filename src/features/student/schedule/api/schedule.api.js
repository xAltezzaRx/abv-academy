import { api } from "@/api/client";
import { mapScheduleWeek } from "./schedule.adapter";

export const scheduleApi = {
    async getWeek() {
        const dto = await api.get("/student/schedule/week");
        return mapScheduleWeek(dto);
    },
};
