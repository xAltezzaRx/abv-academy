import { api } from "@/api/client";
import { mapScheduleWeek } from "./schedule.adapter";

export const scheduleApi = {
    async getWeek() {
        // Когда будет реальный бек:
        // const dto = await api.get("/student/schedule/week");
        // return mapScheduleWeek(dto);

        const dto = [
            {
                dayLabel: "Вторник",
                dateLabel: "29.04",
                isToday: true,
                lessons: [
                    {
                        time: "09:00–09:45",
                        subject: "Математика",
                        teacher: "Иванова А.А.",
                        room: "25",
                        description: "Числовые и буквенные выражения",
                    },
                    {
                        time: "10:00–10:45",
                        subject: "Английский язык",
                        teacher: "Кузнецова М.М.",
                        room: "22",
                        description: "Grammar: word formation",
                    },
                    {
                        time: "11:00–11:45",
                        subject: "История",
                        teacher: "Михайлов А.А.",
                        room: "26",
                        description: "Первобытные охотники и собиратели",
                    },
                ],
            },
            {
                dayLabel: "Среда",
                dateLabel: "30.04",
                isToday: false,
                lessons: [
                    {
                        time: "09:00–09:45",
                        subject: "Математика",
                        teacher: "Иванова А.А.",
                        room: "25",
                        description: "Числовые и буквенные выражения",
                    },
                    {
                        time: "10:00–10:45",
                        subject: "Английский язык",
                        teacher: "Кузнецова М.М.",
                        room: "22",
                        description: "Grammar: word formation",
                    },
                    {
                        time: "11:00–11:45",
                        subject: "История",
                        teacher: "Михайлов А.А.",
                        room: "26",
                        description: "Первобытные охотники и собиратели",
                    },
                ],
            },
            {
                dayLabel: "Четверг",
                dateLabel: "01.05",
                isToday: false,
                lessons: [
                    {
                        time: "09:00–09:45",
                        subject: "Математика",
                        teacher: "Иванова А.А.",
                        room: "25",
                        description: "Числовые и буквенные выражения",
                    },
                    {
                        time: "10:00–10:45",
                        subject: "Английский язык",
                        teacher: "Кузнецова М.М.",
                        room: "22",
                        description: "Grammar: word formation",
                    },
                    {
                        time: "11:00–11:45",
                        subject: "История",
                        teacher: "Михайлов А.А.",
                        room: "26",
                        description: "Первобытные охотники и собиратели",
                    },
                ],
            },
            {
                dayLabel: "Пятница",
                dateLabel: "02.05",
                isToday: false,
                lessons: [
                    {
                        time: "09:00–09:45",
                        subject: "Математика",
                        teacher: "Иванова А.А.",
                        room: "25",
                        description: "Числовые и буквенные выражения",
                    },
                    {
                        time: "10:00–10:45",
                        subject: "Английский язык",
                        teacher: "Кузнецова М.М.",
                        room: "22",
                        description: "Grammar: word formation",
                    },
                    {
                        time: "11:00–11:45",
                        subject: "История",
                        teacher: "Михайлов А.А.",
                        room: "26",
                        description: "Первобытные охотники и собиратели",
                    },
                ],
            },
        ];

        return mapScheduleWeek(dto);
    },
};