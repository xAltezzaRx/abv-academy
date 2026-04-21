<script setup>
import { useStudentScheduleStore } from "../model/schedule.store";

import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";

const scheduleStore = useStudentScheduleStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(scheduleStore, "days");
</script>

<template>
  <section>
    <AppSkeleton v-if="isLoading" :lines="8" />

    <AppError
        v-else-if="isError"
        :message="scheduleStore.error"
        @retry="scheduleStore.fetchSchedule()"
    />

    <AppEmpty
        v-else-if="isEmpty"
        title="Расписание пусто"
        description="Когда появятся занятия, они будут показаны здесь."
    />

    <div v-else>
      <CabSectionTitle>Расписание</CabSectionTitle>

      <CabCard :padded="false" class="week">
        <div
            v-for="(d, idx) in scheduleStore.days"
            :key="d.dayLabel + d.dateLabel"
            class="day"
            :class="{ 'day--active': idx === 1 }"
        >
          <div class="day__head">
            <div class="day__name">{{ d.dayLabel }}</div>
            <div class="day__date">{{ d.dateLabel }}</div>
          </div>

          <div class="lessons">
            <div v-for="l in d.lessons" :key="l.time + l.subject" class="lesson">
              <div class="lesson__time">{{ l.time }}</div>
              <div class="lesson__main">
                <div class="lesson__subject">{{ l.subject }}</div>
                <div class="lesson__meta">{{ l.teacher }}</div>
              </div>
              <div class="lesson__room">{{ l.room }} каб.</div>
            </div>
          </div>
        </div>
      </CabCard>
    </div>
  </section>
</template>

<style scoped>
.week {
  overflow: hidden;
}

.day {
  padding: 14px;
  border-top: 1px solid rgba(0,0,0,.06);
}

.day:first-child {
  border-top: 0;
}

.day__head {
  display: flex;
  gap: 10px;
  align-items: baseline;
  margin-bottom: 10px;
  font-weight: 900;
}

.day__name {
  font-size: 14px;
}

.day__date {
  font-size: 13px;
  opacity: .7;
}

.lessons {
  display: grid;
  gap: 8px;
}

.lesson {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) 80px;
  gap: 10px;
  align-items: start;
}

.lesson__time {
  font-weight: 800;
  font-size: 13px;
  opacity: .95;
}

.lesson__subject {
  font-weight: 900;
  font-size: 13px;
}

.lesson__meta {
  font-size: 12px;
  opacity: .75;
  margin-top: 2px;
}

.lesson__room {
  text-align: right;
  font-size: 12px;
  opacity: .8;
  font-weight: 800;
}

.day--active {
  background: #5b129b;
  color: #fff;
}

.day--active .day__date,
.day--active .lesson__meta,
.day--active .lesson__room {
  opacity: .9;
}

@media (max-width: 800px) {
  .lesson {
    grid-template-columns: 92px minmax(0, 1fr);
  }

  .lesson__room {
    display: none;
  }
}
</style>