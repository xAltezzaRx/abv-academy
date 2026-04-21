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
.cabinet-root{
  min-height: 100vh;
  background: #fff;
}

.cabinet-top{
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
}

.cabinet-top__inner{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cabinet-top__title{
  margin: 0;
  font-size: 44px; /* под твою стилистику можно подогнать */
  font-weight: 700;
  line-height: 1.1;
}

.cabinet-top__logout{
  background: transparent;
  border: none;
  color: #6A00A8; /* твой фиолетовый */
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
}

.cabinet-main{
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

/* MOBILE (<=800) — шапка НЕ исчезает, просто компактнее */
@media (max-width: 800px){
  .cabinet-top__inner{
    padding: 16px 16px 8px;
  }
  .cabinet-top__title{
    font-size: 24px;
  }
  .cabinet-main{
    padding: 0 16px 84px; /* оставь место под нижнюю навигацию */
  }
}
</style>
