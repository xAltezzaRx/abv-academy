import { api } from "@/api/client";
import { mapHomeworkList } from "./homework.adapter";

export const homeworkApi = {
    async getList() {
        const dto = await api.get("/student/homework");
        return mapHomeworkList(dto);
    },
};
