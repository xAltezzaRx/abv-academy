<template>
  <div class="box">
    <div class="box__title">КАНИКУЛЫ</div>
    <div class="vac">
      <div class="vac__days">Осталось 23 дня</div>
      <div class="vac__hint">до ближайших каникул</div>
    </div>
  </div>
</template>

<style scoped>
.box{
  background:#fff;
  border-radius:22px;
  padding:14px;
}
.box__title{
  font-weight:800;
  margin-bottom:10px;
}
.vac{
  background:#f3f3f3;
  border-radius:16px;
  padding:14px;
}
.vac__days{ font-weight:800; }
.vac__hint{ font-size:12px; opacity:.7; margin-top:6px; }
</style>
