<template>
  <header class="cab-top">
    <h1 class="cab-top__title">Личный кабинет</h1>

    <button class="cab-top__logout" type="button">
      Выход
    </button>
  </header>
</template>

<style scoped>
.cab-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px 0 18px;
}

.cab-top__title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.cab-top__logout {
  background: transparent;
  border: 0;
  padding: 8px 12px;
  font-size: 14px;
  color: #6b2aa6;
  cursor: pointer;
}
.cab-top__logout:hover { text-decoration: underline; }

@media (max-width: 800px) {
  .cab-top {
    padding: 16px 0 12px;
  }
  .cab-top__title {
    font-size: 20px;
  }
}
</style>
