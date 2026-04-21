<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/features/auth/model/auth.store";

const auth = useAuthStore();
const roles = ["student", "parent", "teacher", "admin"];

const isDev = import.meta.env.DEV;

const current = computed(() => auth.role || "—");
const isAuth = computed(() => auth.isAuth);

const setRole = (r) => auth.setRole(r);
const logout = () => auth.logout();
</script>

<template>
  <div v-if="isDev" class="dev">
    <div class="dev__row">
      <b>DEV</b>
      <span class="dev__pill">auth: {{ isAuth ? "yes" : "no" }}</span>
      <span class="dev__pill">role: {{ current }}</span>
    </div>

    <div class="dev__row dev__buttons">
      <button
          v-for="r in roles"
          :key="r"
          type="button"
          class="dev__btn"
          :class="{ 'is-active': auth.role === r }"
          @click="setRole(r)"
      >
        {{ r }}
      </button>

      <button type="button" class="dev__btn dev__btn--ghost" @click="logout">
        logout
      </button>
    </div>
  </div>
</template>

<style scoped>
.dev {
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 9999;

  width: min(360px, calc(100vw - 24px));
  padding: 12px;
  border-radius: 14px;

  background: rgba(255,255,255,.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,.08);
  box-shadow: 0 12px 30px rgba(0,0,0,.12);

  font-size: 12px;
}

.dev__row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.dev__buttons {
  margin-top: 10px;
}

.dev__pill {
  padding: 4px 8px;
  border-radius: 999px;
  background: #f3f3f3;
  font-weight: 800;
}

.dev__btn {
  border: 0;
  border-radius: 10px;
  padding: 8px 10px;
  background: #f3f3f3;
  font-weight: 900;
  cursor: pointer;
}

.dev__btn.is-active {
  background: #5b129b;
  color: #fff;
}

.dev__btn--ghost {
  margin-left: auto;
  background: transparent;
  border: 1px solid rgba(0,0,0,.12);
}
</style>
