<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  rows: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="card">
    <div class="card__avatar" />

    <div class="card__body">
      <h2 class="card__title">{{ title }}</h2>

      <div v-if="subtitle" class="card__subtitle">
        {{ subtitle }}
      </div>

      <div class="card__rows">
        <div v-for="row in rows" :key="row.label" class="card__row">
          <span class="card__label">{{ row.label }}:</span>
          <span class="card__value">{{ row.value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 16px;
  align-items: start;

  padding: 18px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 22px rgba(0,0,0,.06);
  border: 1px solid rgba(0,0,0,.06);
}

.card__avatar {
  width: 92px;
  height: 92px;
  border-radius: 18px;
  background: #e9e9e9;
}

.card__title {
  margin: 0;
  font-size: 28px;
  font-weight: 900;
  line-height: 1.1;
}

.card__subtitle {
  margin-top: 6px;
  font-size: 14px;
  opacity: .75;
}

.card__rows {
  margin-top: 12px;
  display: grid;
  gap: 8px;
}

.card__row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 14px;
}

.card__label {
  font-weight: 900;
}

.card__value {
  opacity: .9;
}

@media (max-width: 800px) {
  .card {
    grid-template-columns: 72px 1fr;
    gap: 12px;
    padding: 14px;
    border-radius: 16px;
  }

  .card__avatar {
    width: 72px;
    height: 72px;
    border-radius: 14px;
  }

  .card__title {
    font-size: 20px;
  }

  .card__row {
    font-size: 13px;
  }
}
</style>