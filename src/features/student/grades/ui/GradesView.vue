<script setup>
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentGradesStore } from "../model/grades.store";

const gradesStore = useStudentGradesStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(gradesStore, "items");
</script>

<template>
  <section>
    <AppSkeleton v-if="isLoading" :lines="7" />

    <AppError
        v-else-if="isError"
        :message="gradesStore.error"
        @retry="gradesStore.fetchGrades()"
    />

    <AppEmpty
        v-else-if="isEmpty"
        title="Оценок пока нет"
        description="Здесь появятся текущие оценки по предметам."
    />

    <div v-else>
      <CabSectionTitle>Ведомость</CabSectionTitle>

      <div class="list">
        <CabCard v-for="g in gradesStore.items" :key="g.id">
          <div class="row">
            <div class="main">
              <div class="subject">{{ g.subject }}</div>
              <div class="teacher">{{ g.teacher }}</div>
            </div>

            <div class="mark">{{ g.current }}</div>
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
  align-items: center;
}

.subject {
  font-weight: 900;
  font-size: 14px;
  margin-bottom: 4px;
}

.teacher {
  font-size: 12px;
  opacity: .75;
}

.mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #f3f3f3;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 16px;
}
</style>