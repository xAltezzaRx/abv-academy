<script setup>
import { onMounted } from "vue";
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentHomeworkStore } from "../model/homework.store";

const hwStore = useStudentHomeworkStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(hwStore, "items");

onMounted(() => {
  if (!hwStore.items.length && !hwStore.loading) {
    hwStore.fetchHomework();
  }
});
</script>

<template>
  <section>
    <AppSkeleton v-if="isLoading" :lines="7" />

    <AppError
        v-else-if="isError"
        :message="hwStore.error"
        @retry="hwStore.fetchHomework()"
    />

    <AppEmpty
        v-else-if="isEmpty"
        title="Домашних заданий нет"
        description="Когда преподаватели добавят задания, они появятся здесь."
    />

    <div v-else>
      <CabSectionTitle>Домашние задания</CabSectionTitle>

      <div class="list">
        <CabCard v-for="h in hwStore.items" :key="h.id">
          <div class="task">
            <div class="task__main">
              <div class="task__subject">{{ h.subject }}</div>
              <div class="task__text">{{ h.title }}</div>
            </div>

            <div class="task__side">
              <div class="task__badge">до {{ h.due }}</div>
              <div class="task__status">Новое</div>
            </div>
          </div>
        </CabCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: grid;
  gap: 14px;
}

.task {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.task__main {
  min-width: 0;
}

.task__subject {
  font-size: 18px;
  font-weight: 900;
  color: var(--cab-accent);
}

.task__text {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.45;
  color: var(--cab-text);
}

.task__side {
  flex: 0 0 auto;
  display: grid;
  gap: 8px;
  justify-items: end;
}

.task__badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--cab-accent-soft);
  color: var(--cab-accent);
  font-size: 12px;
  font-weight: 900;
}

.task__status {
  padding: 7px 10px;
  border-radius: 999px;
  background: #f3f3f5;
  color: var(--cab-text-soft);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

@media (max-width: 800px) {
  .task {
    flex-direction: column;
    gap: 12px;
  }

  .task__subject {
    font-size: 16px;
  }

  .task__text {
    font-size: 13px;
  }

  .task__side {
    justify-items: start;
  }
}
</style>