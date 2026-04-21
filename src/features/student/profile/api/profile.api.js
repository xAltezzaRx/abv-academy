import { api } from "@/api/client";
import { mapStudentProfile } from "./profile.adapter";

export const profileApi = {
    async getProfile() {
        const dto = await api.get("/student/profile");
        return mapStudentProfile(dto);
    },
};
