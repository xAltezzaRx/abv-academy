import { http, HttpResponse } from "msw";

export const handlers = [
    // schedule
    http.get("/student/schedule/week", () => {
        return HttpResponse.json([
            {
                dayLabel: "Вторник",
                dateLabel: "29.04",
                lessons: [
                    { time: "09:00–09:45", subject: "Математика", teacher: "Иванова А.А.", room: "25" },
                    { time: "10:00–10:45", subject: "Английский язык", teacher: "Кузнецова М.М.", room: "22" },
                ],
            },
            {
                dayLabel: "Среда",
                dateLabel: "30.04",
                lessons: [{ time: "09:00–09:45", subject: "История", teacher: "Михайлов А.А.", room: "26" }],
            },
        ]);
    }),

    // homework
    http.get("/student/homework", () => {
        return HttpResponse.json([
            { id: 1, subject: "Математика", due: "29.04", title: "№ 123, 124 (стр. 45)" },
            { id: 2, subject: "Русский язык", due: "30.04", title: "Упр. 56, выучить правило" },
        ]);
    }),

    // grades
    http.get("/student/grades/summary", () => {
        return HttpResponse.json([
            { id: 1, subject: "Математика", current: "4", teacher: "Иванова А.А." },
            { id: 2, subject: "Английский язык", current: "5", teacher: "Кузнецова М.М." },
            { id: 3, subject: "История", current: "4", teacher: "Михайлов А.А." },
        ]);
    }),

    // notes
    http.get("/student/notes", () => {
        return HttpResponse.json([
            { id: 1, date: "28.04", text: "Принести дневник на подпись." },
            { id: 2, date: "29.04", text: "Подготовить сообщение по истории." },
        ]);
    }),

    // profile
    http.get("/student/profile", () => {
        return HttpResponse.json({
            fullName: "Иванов Иван Иванович",
            className: "5А",
            classTeacher: "Петрова Н.Н.",
            teacher: "Иванова О.В.",
            phone: "+7 (999) 111-22-33",
        });
    }),
];
