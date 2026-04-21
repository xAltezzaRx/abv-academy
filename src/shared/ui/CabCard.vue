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
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(0,0,0,.06);
  border: 1px solid rgba(0,0,0,.06);
}

.card--padded {
  padding: 14px;
}
</style>
