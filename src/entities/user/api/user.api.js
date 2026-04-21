import { api } from "@/api/client";
import { mapUserProfile } from "./user.adapter";

export const userApi = {
    async getMe(role) {
        // Когда появится реальный бек:
        // const dto = await api.get("/me");
        // return mapUserProfile(dto);

        const mocks = {
            student: {
                fullName: "Иванов Иван Иванович",
                role: "student",
                subtitle: "Ученик",
                rows: [
                    { label: "Класс", value: "5А" },
                    { label: "Классный руководитель", value: "Петрова Н.Н." },
                    { label: "Учитель", value: "Иванова О.В." },
                    { label: "Телефон", value: "+7 (999) 111-22-33" },
                ],
            },
            parent: {
                fullName: "Петрова Анна Сергеевна",
                role: "parent",
                subtitle: "Родитель",
                rows: [
                    { label: "Ребёнок", value: "Иванов Иван" },
                    { label: "Класс", value: "5А" },
                    { label: "Телефон", value: "+7 (999) 222-33-44" },
                ],
            },
            teacher: {
                fullName: "Иванова Ольга Викторовна",
                role: "teacher",
                subtitle: "Учитель",
                rows: [
                    { label: "Предмет", value: "Математика" },
                    { label: "Классы", value: "5А, 5Б, 6А" },
                    { label: "Телефон", value: "+7 (999) 333-44-55" },
                ],
            },
            admin: {
                fullName: "Смирнов Алексей Петрович",
                role: "admin",
                subtitle: "Администратор",
                rows: [
                    { label: "Роль", value: "Администратор системы" },
                    { label: "Телефон", value: "+7 (999) 444-55-66" },
                ],
            },
        };

        return mapUserProfile(mocks[role] || {
            fullName: "Пользователь",
            role: role || "guest",
            subtitle: "",
            rows: [],
        });
    },
};