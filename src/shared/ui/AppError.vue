<script setup>
defineProps({
  message: { type: String, default: "Ошибка" },
  actionText: { type: String, default: "Повторить" },
});

const emit = defineEmits(["retry"]);
</script>

<template>
  <div class="err">
    <div class="err__title">Что-то пошло не так</div>
    <div class="err__msg">{{ message }}</div>

    <button class="err__btn" type="button" @click="emit('retry')">
      {{ actionText }}
    </button>
  </div>
</template>

<style scoped>
.err {
  padding: 14px;
  border-radius: 14px;
  background: #fff3f3;
  border: 1px solid rgba(0,0,0,.08);
}

.err__title {
  font-weight: 800;
  margin-bottom: 6px;
}

.err__msg {
  opacity: .85;
  margin-bottom: 12px;
}

.err__btn {
  border: 0;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 800;
  cursor: pointer;
  background: #5b129b;
  color: #fff;
}
</style>
