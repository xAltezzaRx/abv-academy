<script setup>
import { onMounted } from "vue";
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentGradesStore } from "../model/grades.store";

const gradesStore = useStudentGradesStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(gradesStore, "items");

onMounted(() => {
  if (!gradesStore.items.length && !gradesStore.loading) {
    gradesStore.fetchGrades();
  }
});
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

      <div class="summary">
        <CabCard>
          <div class="summary__label">Средний балл</div>
          <div class="summary__value">4.6</div>
        </CabCard>
      </div>

      <div class="list">
        <CabCard v-for="g in gradesStore.items" :key="g.id">
          <div class="row">
            <div class="row__main">
              <div class="row__subject">{{ g.subject }}</div>
              <div class="row__teacher">{{ g.teacher }}</div>
            </div>

            <div class="row__mark">
              {{ g.current }}
            </div>
          </div>
        </CabCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary {
  margin-bottom: 14px;
}

.summary__label {
  font-size: 13px;
  font-weight: 800;
  color: var(--cab-text-soft);
}

.summary__value {
  margin-top: 6px;
  font-size: 36px;
  font-weight: 900;
  color: var(--cab-accent);
  line-height: 1;
}

.list {
  display: grid;
  gap: 14px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.row__main {
  min-width: 0;
}

.row__subject {
  font-size: 18px;
  font-weight: 900;
  color: var(--cab-text);
}

.row__teacher {
  margin-top: 6px;
  font-size: 13px;
  color: var(--cab-text-soft);
}

.row__mark {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: var(--cab-accent);
  color: var(--cab-text-on-accent);
  font-size: 20px;
  font-weight: 900;
  flex: 0 0 auto;
}

@media (max-width: 800px) {
  .summary__value {
    font-size: 28px;
  }

  .row__subject {
    font-size: 16px;
  }

  .row__teacher {
    font-size: 12px;
  }

  .row__mark {
    width: 44px;
    height: 44px;
    font-size: 18px;
    border-radius: 14px;
  }
}
</style>