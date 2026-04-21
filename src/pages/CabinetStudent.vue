<script setup>
import { ref } from "vue";

import CabinetTopbar from "@/components/cabinet/CabinetTopbar.vue";
import CabinetSidebar from "@/components/cabinet/CabinetSidebar.vue";
import CabinetBottomNav from "@/components/cabinet/CabinetBottomNav.vue";

const tab = ref("schedule");
</script>

<template>
  <section class="cab">
    <div class="cab__container">
      <CabinetTopbar />

      <!-- карточка ученика (позже вынесем в компонент UserCard) -->
      <div class="cab__user-card">
        <div class="cab__avatar"></div>
        <div class="cab__user-info">
          <div class="cab__user-name">Иванов Иван Иванович</div>
          <div class="cab__user-row"><b>Класс:</b> 5А</div>
          <div class="cab__user-row"><b>Классный руководитель:</b> Петрова Н.Н.</div>
          <div class="cab__user-row"><b>Учитель:</b> Иванова О.В.</div>
          <div class="cab__user-row"><b>Телефон:</b> +7 (999) 111-22-33</div>
        </div>
      </div>

      <div class="cab__grid">
        <!-- ЛЕВО -->
        <aside class="cab__left">
          <CabinetSidebar v-model="tab" />

          <div class="cab__widget">
            <div class="cab__widget-title">КАЛЕНДАРЬ</div>
            <div class="cab__widget-body">Здесь позже подключим календарь</div>
          </div>

          <div class="cab__widget">
            <div class="cab__widget-title">КАНИКУЛЫ</div>
            <div class="cab__widget-body">Осталось: <b>23 дня</b></div>
          </div>
        </aside>

        <!-- ПРАВО -->
        <main class="cab__main">
          <div class="cab__panel">
            <div class="cab__panel-head">
              <div class="cab__panel-kicker">СЕГОДНЯ</div>
              <div class="cab__panel-date">19 января, понедельник</div>
            </div>

            <!-- пока мок расписания -->
            <div class="cab__day cab__day--active">
              <div class="cab__day-title">Понедельник</div>

              <div class="cab__row">
                <div class="cab__time">08:30</div>
                <div class="cab__lesson">
                  <div class="cab__subject">Русский язык</div>
                  <div class="cab__meta">Практика</div>
                </div>
                <div class="cab__teacher">Иванова Н.И.</div>
                <div class="cab__room">203</div>
              </div>

              <div class="cab__divider"></div>

              <div class="cab__row">
                <div class="cab__time">09:25</div>
                <div class="cab__lesson">
                  <div class="cab__subject">Математика</div>
                  <div class="cab__meta">Контрольная</div>
                </div>
                <div class="cab__teacher">Петров А.А.</div>
                <div class="cab__room">105</div>
              </div>
            </div>

            <div class="cab__day">
              <div class="cab__day-title">Вторник</div>

              <div class="cab__row">
                <div class="cab__time">08:30</div>
                <div class="cab__lesson">
                  <div class="cab__subject">Литература</div>
                  <div class="cab__meta">Чтение</div>
                </div>
                <div class="cab__teacher">Смирнова О.В.</div>
                <div class="cab__room">112</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <CabinetBottomNav v-model="tab" />
    </div>
  </section>
</template>

<style scoped>
.cab {
  width: 100%;
}

.cab__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px 24px;
}

.cab__user-card {
  margin-top: 10px;
  background: #fff;
  border-radius: 18px;
  padding: 18px;
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,.05);
}

.cab__avatar {
  width: 100%;
  height: 100%;
  min-height: 92px;
  border-radius: 14px;
  background: #e7e7e7;
}

.cab__user-name {
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 6px;
}
.cab__user-row { font-size: 13px; margin: 2px 0; }

.cab__grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 18px;
  align-items: start;
}

.cab__widget {
  margin-top: 16px;
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,.05);
}
.cab__widget-title { font-weight: 900; margin-bottom: 8px; }
.cab__widget-body { font-size: 13px; color: #333; }

.cab__panel {
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,.05);
}

.cab__panel-head {
  display: flex;
  gap: 12px;
  align-items: baseline;
  padding: 4px 6px 14px;
}
.cab__panel-kicker { color: #5b129b; font-weight: 900; font-size: 12px; }
.cab__panel-date { font-size: 12px; color: #222; }

.cab__day {
  border-radius: 16px;
  background: #f7f7f7;
  padding: 14px;
  margin-top: 14px;
}
.cab__day--active {
  background: #5b129b;
  color: #fff;
}
.cab__day-title {
  font-weight: 900;
  margin-bottom: 12px;
}

.cab__row {
  display: grid;
  grid-template-columns: 70px 1fr 140px 50px;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
}
.cab__time { font-weight: 900; }
.cab__subject { font-weight: 900; }
.cab__meta { font-size: 12px; opacity: .85; }
.cab__teacher, .cab__room { text-align: right; }

.cab__divider {
  height: 1px;
  background: rgba(255,255,255,.25);
}

.cab__day:not(.cab__day--active) .cab__divider {
  background: rgba(0,0,0,.08);
}

/* ===== MOBILE ===== */
@media (max-width: 800px) {
  .cab__container {
    padding: 0 16px 16px;
  }

  .cab__user-card {
    grid-template-columns: 1fr;
  }

  .cab__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .cab__left {
    order: 1;
  }
  .cab__main {
    order: 2;
  }

  .cab__row {
    grid-template-columns: 64px 1fr 1fr;
    grid-template-areas:
      "time subject room"
      "time meta teacher";
    align-items: start;
  }
  .cab__time { grid-area: time; }
  .cab__lesson { grid-area: subject; }
  .cab__lesson .cab__meta { grid-area: meta; }
  .cab__teacher { grid-area: teacher; text-align: left; font-size: 12px; opacity: .9; }
  .cab__room { grid-area: room; text-align: right; font-weight: 900; }
}
</style>
