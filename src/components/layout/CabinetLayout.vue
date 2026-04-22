<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { useUserStore } from "@/entities/user/model/user.store";

const router = useRouter();
const auth = useAuthStore();
const userStore = useUserStore();

function logout() {
  auth.logout();
  userStore.clear();
  router.push({ name: "login" }); // это /auth/login
}
</script>


<template>
  <div class="cabinet-root">
    <header class="cabinet-top">
      <div class="cabinet-top__inner">
        <h1 class="cabinet-top__title">Личный кабинет</h1>

        <button class="cabinet-top__logout" type="button" @click="logout">
          Выход
        </button>
      </div>
    </header>

    <main class="cabinet-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.cabinet-root {
  min-height: 100vh;
  background: var(--cab-bg);
  color: var(--cab-text);
}

.cabinet-top {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(247, 247, 248, 0.92);
  backdrop-filter: blur(8px);
}

.cabinet-top__inner {
  max-width: var(--cab-container);
  margin: 0 auto;
  padding: 24px 24px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cabinet-top__title {
  margin: 0;
  font-size: var(--cab-title-xl);
  font-weight: 900;
  line-height: 1;
  color: var(--cab-accent);
}

.cabinet-top__logout {
  background: transparent;
  border: none;
  color: var(--cab-accent);
  font-weight: 800;
  cursor: pointer;
  font-size: var(--cab-text-md);
}

.cabinet-main {
  max-width: var(--cab-container);
  margin: 0 auto;
  padding: 0 24px 48px;
}

@media (max-width: 800px) {
  .cabinet-top__inner {
    padding: 14px 16px 8px;
    align-items: flex-start;
  }

  .cabinet-top__title {
    font-size: 24px;
    line-height: 1;
  }

  .cabinet-top__logout {
    font-size: 14px;
    margin-top: 4px;
  }

  .cabinet-main {
    padding: 0 16px 88px;
  }
}
</style>
