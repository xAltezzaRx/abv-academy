<template>
  <section class="widget">
    <h3 class="widget__title">КАНИКУЛЫ</h3>

    <div class="widget__count">
      Осталось: <span>32 дня</span>
    </div>

    <div class="widget__image">
      <div class="widget__sun" />
      <div class="widget__hill widget__hill--one" />
      <div class="widget__hill widget__hill--two" />
      <div class="widget__bird">🦉</div>
    </div>
  </section>
</template>

<style scoped>
.widget {
  overflow: hidden;
  border-radius: var(--cab-radius-md);
  background: #efe8f7;
  box-shadow: var(--cab-shadow-sm);
  border: 1px solid rgba(122, 61, 179, 0.08);
}

.widget__title {
  margin: 0;
  padding: 18px 18px 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--cab-accent);
}

.widget__count {
  padding: 12px 18px 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--cab-text);
}

.widget__count span {
  font-size: 22px;
  font-weight: 900;
  color: var(--cab-accent);
}

.widget__image {
  position: relative;
  height: 190px;
  margin-top: 14px;
  background: linear-gradient(180deg, #f6eeff 0%, #d9c5ef 100%);
}

.widget__sun {
  position: absolute;
  top: 22px;
  right: 26px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #ffd85c;
}

.widget__hill {
  position: absolute;
  left: -20px;
  right: -20px;
  border-radius: 50%;
}

.widget__hill--one {
  bottom: 42px;
  height: 90px;
  background: #ffd969;
}

.widget__hill--two {
  bottom: -10px;
  height: 120px;
  background: #64c8f4;
}

.widget__bird {
  position: absolute;
  left: 50%;
  bottom: 34px;
  transform: translateX(-50%);
  font-size: 52px;
}
</style>