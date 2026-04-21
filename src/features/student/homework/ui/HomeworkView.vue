<script setup>
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentHomeworkStore } from "../model/homework.store";

const hwStore = useStudentHomeworkStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(hwStore, "items");
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
          <div class="row">
            <div class="main">
              <div class="subject">{{ h.subject }}</div>
              <div class="text">{{ h.title }}</div>
            </div>

            <div class="badge">до {{ h.due }}</div>
          </div>
        </CabCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: grid;
  gap: 12px;
}

.row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: flex-start;
}

.subject {
  font-weight: 900;
  font-size: 14px;
  margin-bottom: 6px;
}

.text {
  opacity: .8;
  font-size: 13px;
  line-height: 1.35;
}

.badge {
  flex: 0 0 auto;
  padding: 8px 10px;
  border-radius: 12px;
  background: #f3f3f3;
  font-weight: 900;
  font-size: 12px;
}
</style>