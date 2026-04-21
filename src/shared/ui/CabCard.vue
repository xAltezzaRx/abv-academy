<script setup>
defineProps({
  padded: { type: Boolean, default: true },
});
</script>

<template>
  <div class="card" :class="{ 'card--padded': padded }">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--cab-surface);
  border-radius: var(--cab-radius-md);
  box-shadow: var(--cab-shadow-sm);
  border: 1px solid var(--cab-border);
}

.card--padded {
  padding: 16px;
}

@media (max-width: 800px) {
  .card--padded {
    padding: 14px;
  }
}
</style>
