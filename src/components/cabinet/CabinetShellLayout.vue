<script setup>
defineProps({
  showWidgets: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="cab">
    <div class="cab__container">
      <slot name="top" />

      <div class="cab__grid">
        <aside class="cab__left">
          <slot name="sidebar" />

          <div v-if="showWidgets" class="cab__widgets">
            <slot name="widgets" />
          </div>
        </aside>

        <main class="cab__main">
          <slot />
        </main>
      </div>

      <slot name="bottomNav" />
    </div>
  </section>
</template>

<style scoped>
.cab__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px 24px;
}

.cab__grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.cab__widgets {
  margin-top: 16px;
  display: grid;
  gap: 14px;
}

@media (max-width: 800px) {
  .cab__container {
    padding: 0 16px 84px;
  }

  .cab__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .cab__widgets {
    display: none;
  }
}
</style>