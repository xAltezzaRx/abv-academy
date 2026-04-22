<script setup>
import { onMounted } from "vue";
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentProfileStore } from "../model/profile.store";

const profileStore = useStudentProfileStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(profileStore, "data");

onMounted(() => {
  if (!profileStore.data && !profileStore.loading) {
    profileStore.fetchProfile();
  }
});
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
  font-size: 22px;
  font-weight: 900;
  color: var(--cab-accent);
  margin-bottom: 16px;
  line-height: 1.1;
}

.grid {
  display: grid;
  gap: 12px;
}

.item {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--cab-surface-muted);
}

.label {
  font-size: 12px;
  font-weight: 900;
  color: var(--cab-text-soft);
  text-transform: uppercase;
}

.value {
  font-size: 15px;
  font-weight: 800;
  color: var(--cab-text);
}

@media (max-width: 800px) {
  .name {
    font-size: 18px;
  }

  .item {
    padding: 12px 14px;
  }

  .value {
    font-size: 14px;
  }
}
</style>