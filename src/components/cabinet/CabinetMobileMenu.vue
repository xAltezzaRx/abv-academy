<script setup>
import { computed, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { getNavItemsByRole } from "@/features/auth/lib/getNavItemsByRole";

const route = useRoute();
const auth = useAuthStore();

const items = computed(() => getNavItemsByRole(auth.role));

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
const close = () => emit("close");

const lockBody = () => {
  document.body.style.overflow = "hidden";
};

const unlockBody = () => {
  document.body.style.overflow = "";
};

const onKeydown = (e) => {
  if (e.key === "Escape" && props.open) {
    close();
  }
};

watch(
    () => props.open,
    (isOpen) => {
      if (isOpen) {
        lockBody();
        window.addEventListener("keydown", onKeydown);
      } else {
        unlockBody();
        window.removeEventListener("keydown", onKeydown);
      }
    },
    { immediate: true }
);

onBeforeUnmount(() => {
  unlockBody();
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="open" class="sheet">
        <div class="sheet__backdrop" @click="close" />

        <transition name="sheet-up">
          <div v-if="open" class="sheet__panel">
            <div class="sheet__handle" />

            <div class="sheet__head">
              <div class="sheet__title">Меню кабинета</div>
              <button class="sheet__close" type="button" @click="close">
                Закрыть
              </button>
            </div>

            <nav class="sheet__nav">
              <RouterLink
                  v-for="it in items"
                  :key="it.key"
                  :to="it.to"
                  class="sheet__item"
                  :class="{ 'is-active': route.name === it.to.name }"
                  @click="close"
              >
                <span class="sheet__icon">{{ it.icon }}</span>
                <span>{{ it.label }}</span>
              </RouterLink>
            </nav>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.sheet {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.sheet__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.32);
}

.sheet__panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 20px 20px 0 0;
  background: #fff;
  padding: 10px 12px calc(16px + env(safe-area-inset-bottom));
  box-shadow: 0 -10px 30px rgba(0,0,0,.14);
}

.sheet__handle {
  width: 44px;
  height: 5px;
  border-radius: 999px;
  background: #ddd;
  margin: 0 auto 10px;
}

.sheet__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.sheet__title {
  font-size: 16px;
  font-weight: 900;
}

.sheet__close {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 800;
  color: #5b129b;
}

.sheet__nav {
  display: grid;
  gap: 10px;
}

.sheet__item {
  display: flex;
  align-items: center;
  gap: 10px;

  min-height: 48px;
  padding: 12px 14px;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  background: #f3f3f3;
  font-weight: 800;
}

.sheet__item.is-active {
  background: #5b129b;
  color: #fff;
}

.sheet__icon {
  width: 20px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sheet-up-enter-active,
.sheet-up-leave-active {
  transition: transform .2s ease, opacity .2s ease;
}
.sheet-up-enter-from,
.sheet-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>