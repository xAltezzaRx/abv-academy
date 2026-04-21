<script setup>
defineProps({
  lines: { type: Number, default: 4 },
});
</script>

<template>
  <div class="sk">
    <div v-for="i in lines" :key="i" class="sk__line" />
  </div>
</template>

<style scoped>
.sk {
  display: grid;
  gap: 10px;
}

.sk__line {
  height: 44px;
  border-radius: 12px;
  background: #f3f3f3;
}
</style>
