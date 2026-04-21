<script setup>
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentProfileStore } from "../model/profile.store";

const profileStore = useStudentProfileStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(profileStore, "data");
</script>

<template>
  <section>
    <AppSkeleton v-if="isLoading" :lines="6" />

    <AppError
        v-else-if="isError"
        :message="profileStore.error"
        @retry="profileStore.fetchProfile()"
    />

    <AppEmpty
        v-else-if="isEmpty"
        title="Профиль пуст"
        description="Данные профиля появятся здесь после загрузки."
    />

    <div v-else-if="profileStore.data">
      <CabSectionTitle>Личная информация</CabSectionTitle>

      <CabCard>
        <div class="name">{{ profileStore.data.fullName }}</div>

        <div class="grid">
          <div class="item">
            <div class="label">Класс</div>
            <div class="value">{{ profileStore.data.className }}</div>
          </div>

          <div class="item">
            <div class="label">Классный руководитель</div>
            <div class="value">{{ profileStore.data.classTeacher }}</div>
          </div>

          <div class="item">
            <div class="label">Учитель</div>
            <div class="value">{{ profileStore.data.teacher }}</div>
          </div>

          <div class="item">
            <div class="label">Телефон</div>
            <div class="value">{{ profileStore.data.phone }}</div>
          </div>
        </div>
      </CabCard>
    </div>
  </section>
</template>

<style scoped>
.name {
  font-weight: 900;
  font-size: 15px;
  margin-bottom: 12px;
}

.grid {
  display: grid;
  gap: 10px;
}

.item {
  display: grid;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 14px;
  background: #f3f3f3;
}

.label {
  font-size: 12px;
  opacity: .7;
  font-weight: 800;
}

.value {
  font-size: 13px;
  font-weight: 900;
}
</style>