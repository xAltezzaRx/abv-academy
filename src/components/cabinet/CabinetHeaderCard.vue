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
    <div class="card__avatar-wrap">
      <div class="card__avatar" />
    </div>

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
  grid-template-columns: 150px 1fr;
  gap: 22px;
  align-items: start;

  padding: 28px 32px;
  border-radius: var(--cab-radius-lg);
  background: var(--cab-surface);
  border: 1px solid var(--cab-border);
  box-shadow: var(--cab-shadow-md);
}

.card__avatar-wrap {
  display: flex;
  justify-content: center;
}

.card__avatar {
  width: 142px;
  height: 182px;
  border-radius: 18px;
  background:
      linear-gradient(180deg, rgba(122, 61, 179, 0.06), rgba(122, 61, 179, 0.14)),
      var(--cab-surface-muted);
  border: 1px solid rgba(122, 61, 179, 0.08);
}

.card__body {
  min-width: 0;
}

.card__title {
  margin: 8px 0 0;
  font-size: 28px;
  line-height: 1.05;
  font-weight: 900;
  color: var(--cab-text);
  text-transform: uppercase;
}

.card__subtitle {
  margin-top: 10px;
  font-size: 16px;
  color: var(--cab-text-soft);
}

.card__rows {
  margin-top: 18px;
  display: grid;
  gap: 12px;
}

.card__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 16px;
  line-height: 1.25;
}

.card__label {
  font-weight: 900;
  color: var(--cab-text);
}

.card__value {
  color: var(--cab-text-soft);
}

@media (max-width: 800px) {
  .card {
    grid-template-columns: 76px 1fr;
    gap: 14px;
    padding: 14px;
    border-radius: var(--cab-radius-md);
  }

  .card__avatar {
    width: 64px;
    height: 64px;
    border-radius: 16px;
  }

  .card__title {
    margin-top: 0;
    font-size: 18px;
    text-transform: none;
  }

  .card__subtitle {
    margin-top: 4px;
    font-size: 13px;
  }

  .card__rows {
    margin-top: 10px;
    gap: 8px;
  }

  .card__row {
    font-size: 13px;
  }
}
</style>