<script setup>
import { useRoute } from "vue-router";
import { studentNavItems } from "@/features/student/navigation/studentNav.items";

const route = useRoute();
</script>

<template>
  <nav class="cab-menu">
    <RouterLink
        v-for="it in studentNavItems"
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
  gap: 12px;
}

.cab-menu__item {
  text-align: left;

  padding: 14px 16px;
  border-radius: 14px;
  background: #f3f3f3;

  font-size: 14px;
  font-weight: 600;

  display: block;
  color: inherit;
  text-decoration: none;
}

.cab-menu__item.is-active {
  background: #5b129b;
  color: #fff;
}

@media (max-width: 800px) {
  .cab-menu { display: none; }
}
</style>

