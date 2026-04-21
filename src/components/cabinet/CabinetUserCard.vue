<template>
  <div class="usercard">
    <div class="usercard__avatar"></div>

    <div class="usercard__info">
      <div class="usercard__name">Иванов Иван Иванович</div>
      <div class="usercard__row"><b>Класс:</b> 5А</div>
      <div class="usercard__row"><b>Классный руководитель:</b> Петрова Н.Н.</div>
      <div class="usercard__row"><b>Учитель:</b> Иванова О.В.</div>
      <div class="usercard__row"><b>Телефон:</b> +7 (999) 111-22-33</div>
    </div>
  </div>
</template>

<style scoped>
.usercard{
  background:#fff;
  border-radius:22px;
  padding:18px;
  display:flex;
  gap:16px;
  align-items:flex-start;
}
.usercard__avatar{
  width:92px;
  height:92px;
  border-radius:18px;
  background:#e7e7e7;
  flex: 0 0 auto;
}
.usercard__name{
  font-weight:800;
  font-size:18px;
  margin-bottom:10px;
}
.usercard__row{
  font-size:14px;
  line-height:1.35;
  margin-top:4px;
}
@media (max-width:800px){
  .usercard{ flex-direction: column; }
  .usercard__avatar{ width: 100%; height: 140px; }
}
</style>
