<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { getNavItemsByRole } from "@/features/auth/lib/getNavItemsByRole";
import CabinetMobileMenu from "./CabinetMobileMenu.vue";


const route = useRoute();
const auth = useAuthStore();
const isMenuOpen = ref(false);

const allItems = computed(() => getNavItemsByRole(auth.role));
const primaryItems = computed(() => allItems.value.slice(0, 4));

const openMenu = () => {
  isMenuOpen.value = true;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(
    () => route.fullPath,
    () => {
      isMenuOpen.value = false;
    }
);

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

    <button
        v-if="allItems.length > 4"
        type="button"
        class="bn__item"
        @click="openMenu"
    >
      <span class="bn__icon">☰</span>
      <span class="bn__label">Меню</span>
    </button>
  </nav>

  <CabinetMobileMenu :open="isMenuOpen" @close="closeMenu" />
</template>

<style scoped>
.bn {
  display: none;
}

@media (max-width: 800px) {
  .bn {
    position: sticky;
    bottom: 0;
    z-index: 40;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;

    padding:
        8px 10px
        calc(8px + env(safe-area-inset-bottom));
    background: rgba(247, 247, 248, 0.96);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--cab-border);
  }

  .bn__item {
    display: grid;
    justify-items: center;
    gap: 4px;

    min-height: 58px;
    padding: 8px 4px;
    border-radius: 16px;
    text-decoration: none;
    color: var(--cab-text-soft);
    border: 0;
    background: var(--cab-surface);
    box-shadow: var(--cab-shadow-sm);
    cursor: pointer;
    transition: transform .08s ease, background .15s ease, color .15s ease;
  }

  .bn__item:active {
    transform: translateY(1px);
  }

  .bn__icon {
    font-size: 16px;
    line-height: 1;
  }

  .bn__label {
    font-size: 10px;
    font-weight: 900;
    line-height: 1;
    text-align: center;
  }

  .bn__item.is-active {
    background: var(--cab-accent);
    color: var(--cab-text-on-accent);
  }
}
</style>