<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { studentNavItems } from "@/features/student/navigation/studentNav.items";
import CabinetMobileMenu from "./CabinetMobileMenu.vue";

const route = useRoute();
const isMenuOpen = ref(false);

// 4 главных пункта снизу
const primaryItems = computed(() => [
  studentNavItems.find((i) => i.key === "schedule"),
  studentNavItems.find((i) => i.key === "homework"),
  studentNavItems.find((i) => i.key === "grades"),
  studentNavItems.find((i) => i.key === "profile"),
].filter(Boolean));

const openMenu = () => {
  isMenuOpen.value = true;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="bn" aria-label="Навигация кабинета">
    <RouterLink
        v-for="it in primaryItems"
        :key="it.key"
        :to="it.to"
        class="bn__item"
        :class="{ 'is-active': route.name === it.to.name }"
    >
      <span class="bn__icon">{{ it.icon }}</span>
      <span class="bn__label">{{ it.label }}</span>
    </RouterLink>

    <button type="button" class="bn__item" @click="openMenu">
      <span class="bn__icon">☰</span>
      <span class="bn__label">Меню</span>
    </button>
  </nav>

  <CabinetMobileMenu :open="isMenuOpen" @close="closeMenu" />
</template>

<style scoped>
.bn { display: none; }

@media (max-width: 800px) {
  .bn {
    position: sticky;
    bottom: 0;
    z-index: 40;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;

    padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(0,0,0,.06);
  }

  .bn__item {
    display: grid;
    justify-items: center;
    gap: 6px;

    padding: 10px 6px;
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    border: 0;
    background: #f3f3f3;
    cursor: pointer;
  }

  .bn__icon {
    font-size: 18px;
    line-height: 1;
  }

  .bn__label {
    font-size: 11px;
    font-weight: 900;
    line-height: 1;
  }

  .bn__item.is-active {
    background: #5b129b;
    color: #fff;
  }
}
</style>