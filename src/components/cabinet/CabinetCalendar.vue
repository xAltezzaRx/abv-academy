<script setup>
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const days = [
  "", "", "1", "2", "3", "4", "5",
  "6", "7", "8", "9", "10", "11", "12",
  "13", "14", "15", "16", "17", "18", "19",
  "20", "21", "22", "23", "24", "25", "26",
  "27", "28", "29", "30", "31"
];
</script>

<template>
  <section class="widget">
    <h3 class="widget__title">КАЛЕНДАРЬ</h3>
    <div class="widget__month">Май</div>

    <div class="widget__weekdays">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>

    <div class="widget__grid">
      <span
          v-for="(day, idx) in days"
          :key="idx"
          class="widget__day"
          :class="{ 'is-today': day === '9' }"
      >
        {{ day }}
      </span>
    </div>
  </section>
</template>

<style scoped>
.widget {
  padding: 18px 18px 20px;
  border-radius: var(--cab-radius-md);
  background: #efe8f7;
  box-shadow: var(--cab-shadow-sm);
  border: 1px solid rgba(122, 61, 179, 0.08);
}

.widget__title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--cab-accent);
  letter-spacing: 0.02em;
}

.widget__month {
  margin-top: 10px;
  font-size: 22px;
  font-weight: 900;
  text-align: center;
  color: var(--cab-text);
}

.widget__weekdays {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--cab-text-soft);
}

.widget__grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.widget__day {
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  color: var(--cab-text);
}

.widget__day.is-today {
  background: var(--cab-accent);
  color: var(--cab-text-on-accent);
}
</style>