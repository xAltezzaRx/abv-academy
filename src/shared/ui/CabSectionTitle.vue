<script setup>
defineProps({
  as: { type: String, default: "h2" },
});
</script>

<template>
  <component :is="as" class="title">
    <slot />
  </component>
</template>

<style scoped>
.title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 900;
}
</style>
