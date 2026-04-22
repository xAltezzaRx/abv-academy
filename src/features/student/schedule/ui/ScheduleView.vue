<script setup>
import { onMounted } from "vue";
import { useStudentScheduleStore } from "../model/schedule.store";

import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";

const scheduleStore = useStudentScheduleStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(scheduleStore, "days");

onMounted(() => {
  if (!scheduleStore.days.length && !scheduleStore.loading) {
    scheduleStore.fetchSchedule();
  }
});
</script>

<template>
  <section class="schedule">
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
      <CabCard :padded="false" class="schedule-card">
        <div class="schedule-card__head">СЕГОДНЯ</div>

        <section
            v-for="day in scheduleStore.days"
            :key="day.dayLabel + day.dateLabel"
            class="day"
            :class="{ 'day--active': !day.isToday }"
        >
          <div class="day__grid">
            <div class="day__meta">
              <div class="day__title">
                <span class="day__name">{{ day.dayLabel }}</span>
                <span class="day__date">{{ day.dateLabel }}</span>
              </div>
            </div>

            <div class="day__lessons">
              <article
                  v-for="lesson in day.lessons"
                  :key="lesson.time + lesson.subject"
                  class="lesson"
              >
                <div class="lesson__time">{{ lesson.time }}</div>

                <div class="lesson__subject-wrap">
                  <div class="lesson__subject">{{ lesson.subject }}</div>
                  <div v-if="lesson.description" class="lesson__description">
                    {{ lesson.description }}
                  </div>
                </div>

                <div class="lesson__teacher">{{ lesson.teacher }}</div>
                <div class="lesson__room">{{ lesson.room }} каб.</div>
              </article>
            </div>
          </div>
        </section>
      </CabCard>
    </div>
  </section>
</template>

<style scoped>
.schedule-card {
  overflow: hidden;
  background: var(--cab-surface);
}

.schedule-card__head {
  padding: 22px 26px 8px;
  font-size: 20px;
  font-weight: 900;
  color: var(--cab-accent);
  letter-spacing: 0.02em;
}

.day {
  padding: 14px 26px 22px;
  background: var(--cab-surface);
}

.day + .day {
  border-top: 1px solid rgba(255, 255, 255, 0.35);
}

.day--active {
  background: var(--cab-accent);
  color: var(--cab-text-on-accent);
}

.day__grid {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  align-items: start;
}

.day__title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-weight: 900;
}

.day__name {
  font-size: 18px;
}

.day__date {
  font-size: 18px;
  opacity: 0.9;
}

.day__lessons {
  display: grid;
  gap: 16px;
}

.lesson {
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr) 150px 80px;
  gap: 18px;
  align-items: start;
}

.lesson__time {
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}

.lesson__subject {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.1;
}

.lesson__description {
  margin-top: 4px;
  font-size: 11px;
  line-height: 1.15;
  opacity: 0.8;
  max-width: 210px;
}

.lesson__teacher,
.lesson__room {
  font-size: 17px;
  line-height: 1.2;
  white-space: nowrap;
}

.lesson__room {
  text-align: right;
}

.day:not(.day--active) .lesson__subject,
.day:not(.day--active) .day__name,
.day:not(.day--active) .day__date,
.day:not(.day--active) .lesson__teacher,
.day:not(.day--active) .lesson__room,
.day:not(.day--active) .lesson__time {
  color: var(--cab-accent);
}

.day--active .lesson__description,
.day--active .day__date {
  opacity: 0.85;
}

@media (max-width: 1100px) {
  .lesson {
    grid-template-columns: 120px minmax(0, 1fr) 130px 70px;
    gap: 14px;
  }

  .lesson__time,
  .lesson__subject,
  .lesson__teacher,
  .lesson__room,
  .day__name,
  .day__date {
    font-size: 15px;
  }
}

@media (max-width: 800px) {
  .schedule-card__head {
    padding: 16px 16px 6px;
    font-size: 16px;
  }

  .day {
    padding: 12px 16px 16px;
  }

  .day__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .day__title {
    gap: 8px;
  }

  .day__name,
  .day__date {
    font-size: 15px;
  }

  .day__lessons {
    gap: 12px;
  }

  .lesson {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .lesson__time {
    font-size: 14px;
    font-weight: 800;
  }

  .lesson__subject {
    font-size: 15px;
  }

  .lesson__description {
    max-width: none;
    font-size: 11px;
  }

  .lesson__teacher,
  .lesson__room {
    font-size: 13px;
    opacity: 0.9;
  }

  .lesson__room {
    text-align: left;
  }
}
</style>