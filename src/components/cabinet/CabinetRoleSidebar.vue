<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { getNavItemsByRole } from "@/features/auth/lib/getNavItemsByRole";

const route = useRoute();
const auth = useAuthStore();

const items = computed(() => getNavItemsByRole(auth.role));
</script>

<template>
  <nav class="cab-menu">
    <RouterLink
        v-for="it in items"
        :key="it.key"
        :to="it.to"
        class="cab-menu__item"
        :class="{ 'is-active': route.name === it.to.name }"
    >
      {{ it.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.cab-menu {
  display: grid;
  gap: 14px;
}

.cab-menu__item {
  text-align: center;
  padding: 18px 16px;
  border-radius: 20px;
  background: var(--cab-surface);
  font-size: 16px;
  font-weight: 700;
  display: block;
  color: var(--cab-text);
  text-decoration: none;
  box-shadow: var(--cab-shadow-sm);
  border: 1px solid var(--cab-border);
  transition: background .15s ease, color .15s ease, transform .08s ease;
}

.cab-menu__item:hover {
  transform: translateY(-1px);
}

.cab-menu__item.is-active {
  background: var(--cab-accent);
  color: var(--cab-text-on-accent);
}

@media (max-width: 800px) {
  .cab-menu {
    display: none;
  }
}
</style>