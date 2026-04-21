export const getCabinetHeaderByRole = (role) => {
    const map = {
        student: {
            title: "Иванов Иван Иванович",
            subtitle: "Ученик",
            rows: [
                { label: "Класс", value: "5А" },
                { label: "Классный руководитель", value: "Петрова Н.Н." },
                { label: "Учитель", value: "Иванова О.В." },
                { label: "Телефон", value: "+7 (999) 111-22-33" },
            ],
        },

        parent: {
            title: "Петрова Анна Сергеевна",
            subtitle: "Родитель",
            rows: [
                { label: "Ребёнок", value: "Иванов Иван" },
                { label: "Класс", value: "5А" },
                { label: "Телефон", value: "+7 (999) 222-33-44" },
            ],
        },

        teacher: {
            title: "Иванова Ольга Викторовна",
            subtitle: "Учитель",
            rows: [
                { label: "Предмет", value: "Математика" },
                { label: "Классы", value: "5А, 5Б, 6А" },
                { label: "Телефон", value: "+7 (999) 333-44-55" },
            ],
        },

        admin: {
            title: "Смирнов Алексей Петрович",
            subtitle: "Администратор",
            rows: [
                { label: "Роль", value: "Администратор системы" },
                { label: "Телефон", value: "+7 (999) 444-55-66" },
            ],
        },
    };

    return map[role] || {
        title: "Пользователь",
        subtitle: "",
        rows: [],
    };
};