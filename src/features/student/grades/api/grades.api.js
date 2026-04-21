import { api } from "@/api/client";
import { mapGradesSummary } from "./grades.adapter";

export const gradesApi = {
    async getSummary() {
        const dto = await api.get("/student/grades/summary");
        return mapGradesSummary(dto);
    },
};
