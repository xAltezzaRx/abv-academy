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
  max-width: var(--cab-container);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.cab__grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: var(--cab-sidebar-width) minmax(0, 1fr);
  gap: var(--cab-gap);
  align-items: start;
}

.cab__widgets {
  margin-top: 16px;
  display: grid;
  gap: 14px;
}

@media (max-width: 800px) {
  .cab__container {
    padding: 0 16px 88px;
  }

  .cab__grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 12px;
  }

  .cab__widgets {
    display: none;
  }
}
</style>