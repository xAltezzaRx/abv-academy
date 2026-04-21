<script setup>
defineProps({
  title: {
    type: String,
    default: "Пока пусто",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="empty">
    <div class="empty__icon">○</div>
    <div class="empty__title">{{ title }}</div>
    <div v-if="description" class="empty__desc">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.empty {
  padding: 24px 16px;
  border-radius: 16px;
  background: #f8f8f8;
  text-align: center;
  border: 1px dashed rgba(0,0,0,.1);
}

.empty__icon {
  font-size: 24px;
  margin-bottom: 8px;
  opacity: .5;
}

.empty__title {
  font-weight: 900;
  font-size: 15px;
}

.empty__desc {
  margin-top: 6px;
  font-size: 13px;
  opacity: .7;
}
</style>