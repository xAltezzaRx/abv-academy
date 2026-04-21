export const getDefaultCabinetRouteByRole = (role) => {
    const map = {
        student: { name: "student-schedule" },
        parent: { name: "parent-dashboard" },
        teacher: { name: "teacher-dashboard" },
        admin: { name: "admin-dashboard" },
    };

    return map[role] || { name: "home" };
};