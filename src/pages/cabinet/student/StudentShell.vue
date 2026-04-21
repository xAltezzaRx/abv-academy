<script setup>
import CabinetShellLayout from "@/components/cabinet/CabinetShellLayout.vue";
import CabinetHeaderCard from "@/components/cabinet/CabinetHeaderCard.vue";
import CabinetRoleSidebar from "@/components/cabinet/CabinetRoleSidebar.vue";
import CabinetRoleBottomNav from "@/components/cabinet/CabinetRoleBottomNav.vue";
import CabinetCalendar from "@/components/cabinet/CabinetCalendar.vue";
import CabinetVacation from "@/components/cabinet/CabinetVacation.vue";

import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";

import { useUserStore } from "@/entities/user/model/user.store";

const userStore = useUserStore();

</script>

<template>
  <CabinetShellLayout :show-widgets="true">
    <template #top>
      <AppSkeleton v-if="userStore.loading" :lines="2" />

      <AppError
          v-else-if="userStore.error"
          :message="userStore.error"
          @retry="userStore.fetchMe()"
      />

      <CabinetHeaderCard
          v-else-if="userStore.profile"
          :title="userStore.profile.fullName"
          :subtitle="userStore.profile.subtitle"
          :rows="userStore.profile.rows"
      />
    </template>

    <template #sidebar>
      <CabinetRoleSidebar />
    </template>

    <template #widgets>
      <CabinetCalendar />
      <CabinetVacation />
    </template>

    <router-view />

    <template #bottomNav>
      <CabinetRoleBottomNav />
    </template>
  </CabinetShellLayout>
</template>