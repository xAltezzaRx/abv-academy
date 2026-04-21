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
  margin: 0 0 14px;
  font-size: var(--cab-title-md);
  font-weight: 900;
  color: var(--cab-text);
  line-height: 1.1;
}
</style>