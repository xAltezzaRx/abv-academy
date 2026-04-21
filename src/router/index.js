import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from "@/components/layout/AuthLayout.vue";
import CabinetLayout from "@/components/layout/CabinetLayout.vue";
import HomeLayout from "@/components/layout/HomeLayout.vue";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";

import StudentShell from "@/pages/cabinet/student/StudentShell.vue";
import StudentSchedulePage from "@/pages/cabinet/student/StudentSchedulePage.vue";
import StudentHomeworkPage from "@/pages/cabinet/student/StudentHomeworkPage.vue";
import StudentGradesPage from "@/pages/cabinet/student/StudentGradesPage.vue";
import StudentNotesPage from "@/pages/cabinet/student/StudentNotesPage.vue";
import StudentProfilePage from "@/pages/cabinet/student/StudentProfilePage.vue";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { getDefaultCabinetRouteByRole } from "@/features/auth/lib/getDefaultCabinetRouteByRole";
import ParentDashboardPage from "@/pages/cabinet/parent/ParentDashboardPage.vue";
import TeacherDashboardPage from "@/pages/cabinet/teacher/TeacherDashboardPage.vue";
import AdminDashboardPage from "@/pages/cabinet/admin/AdminDashboardPage.vue";
import ParentShell from "@/pages/cabinet/parent/ParentShell.vue";
import TeacherShell from "@/pages/cabinet/teacher/TeacherShell.vue";
import AdminShell from "@/pages/cabinet/admin/AdminShell.vue";
import { useUserStore } from "@/entities/user/model/user.store";


const routes = [
    {
        path: "/",
        component: HomeLayout,
        children: [{ path: "", name: "home", component: HomePage }],
    },

    {
        path: "/auth",
        component: AuthLayout,
        children: [
            { path: "login", name: "login", component: LoginPage },
            { path: "register", name: "register", component: RegisterPage },
        ],
    },

    {
        path: "/cabinet",
        component: CabinetLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "", name: "cabinet-root", component: { template: "<router-view />" } }, // временно
            {
                path: "student",
                component: StudentShell,
                meta: { role: "student" },
                children: [
                    { path: "", redirect: { name: "student-schedule" } },
                    { path: "schedule", name: "student-schedule", component: StudentSchedulePage },
                    { path: "homework", name: "student-homework", component: StudentHomeworkPage },
                    { path: "grades", name: "student-grades", component: StudentGradesPage },
                    { path: "notes", name: "student-notes", component: StudentNotesPage },
                    { path: "profile", name: "student-profile", component: StudentProfilePage },
                ],
            },
            {
                path: "parent",
                component: ParentShell,
                meta: { role: "parent" },
                children: [
                    {
                        path: "",
                        name: "parent-dashboard",
                        component: ParentDashboardPage,
                    },
                ],
            },
            {
                path: "teacher",
                component: TeacherShell,
                meta: { role: "teacher" },
                children: [
                    {
                        path: "",
                        name: "teacher-dashboard",
                        component: TeacherDashboardPage,
                    },
                ],
            },
            {
                path: "admin",
                component: AdminShell,
                meta: { role: "admin" },
                children: [
                    {
                        path: "",
                        name: "admin-dashboard",
                        component: AdminDashboardPage,
                    },
                ],
            },
        ],
    },

    { path: "/:pathMatch(.*)*", redirect: "/" },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach(async (to) => {
    const auth = useAuthStore();
    const userStore = useUserStore();

    // 1) если роут требует авторизацию
    if (to.meta.requiresAuth && !auth.isAuth) {
        userStore.clear();
        return { name: "login" };
    }

    // 2) если открыли /cabinet — отправим в кабинет по роли
    if (to.path === "/cabinet") {
        if (!auth.isAuth) {
            userStore.clear();
            return { name: "login" };
        }

        // грузим пользователя один раз
        if (!userStore.profile && !userStore.loading) {
            await userStore.fetchMe();
        }

        return getDefaultCabinetRouteByRole(auth.role);
    }

    // 3) если роут ограничен по роли
    if (to.meta.role && auth.role && to.meta.role !== auth.role) {
        return getDefaultCabinetRouteByRole(auth.role);
    }

    // 4) если заходим в защищённую часть кабинета — гарантируем, что пользователь загружен
    if (to.meta.requiresAuth && auth.isAuth) {
        if (!userStore.profile && !userStore.loading) {
            await userStore.fetchMe();
        }
    }
});




export default router;


