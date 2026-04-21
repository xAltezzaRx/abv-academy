import { studentNavItems } from "@/features/student/navigation/studentNav.items";
import { parentNavItems } from "@/features/parent/navigation/parentNav.items";
import { teacherNavItems } from "@/features/teacher/navigation/teacherNav.items";
import { adminNavItems } from "@/features/admin/navigation/adminNav.items";

export const getNavItemsByRole = (role) => {
    const map = {
        student: studentNavItems,
        parent: parentNavItems,
        teacher: teacherNavItems,
        admin: adminNavItems,
    };

    return map[role] || [];
};