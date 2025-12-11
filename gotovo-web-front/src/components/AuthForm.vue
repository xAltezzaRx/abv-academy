<template>
  <div class="container">
    <div class="form-container">
      <!-- Заголовок формы -->
      <h2 class="form-title">{{ isLogin ? 'Вход в личный кабинет' : 'Регистрация' }}</h2>
      <!-- Форма авторизации/регистрации -->
      <form @submit.prevent="handleSubmit">
        <!-- Поле email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input
              type="email"
              id="email"
              v-model="form.email"
              required
              placeholder="Введите ваш email"
          />
        </div>
        <!-- Поле пароля -->
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input
              type="password"
              id="password"
              v-model="form.password"
              required
              placeholder="Введите ваш пароль"
          />
        </div>
        <!-- Поле подтверждения пароля (только для регистрации) -->
        <div v-if="!isLogin" class="form-group">
          <label for="confirmPassword">Подтвердите пароль:</label>
          <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              required
              placeholder="Подтвердите ваш пароль"
          />
        </div>
        <!-- Сообщение об ошибке -->
        <div v-if="error" class="error-message">{{ error }}</div>
        <!-- Кнопка отправки формы -->
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться') }}
        </button>
      </form>
      <!-- Ссылка для переключения между формами -->
      <div class="switch-form">
        {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
        <a @click="toggleForm">{{ isLogin ? 'Зарегистрироваться' : 'Войти' }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  data() {
    return {
      isLogin: true, // true - форма входа, false - форма регистрации
      form: {
        email: '',
        password: '',
        confirmPassword: '' // Используется только при регистрации
      },
      error: '',
      loading: false, // Флаг для предотвращения двойных запросов
    };
  },
  methods: {
    toggleForm() {
      if (this.loading) return; // Не переключать, если идет запрос
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        email: '',
        password: '',
        confirmPassword: ''
      };
      this.error = '';
    },
    async handleSubmit() {
      if (this.loading) return; // Не отправлять, если уже идет запрос

      // Сброс ошибки перед отправкой
      this.error = '';
      this.loading = true; // Установить флаг загрузки

      // Проверка на совпадение паролей при регистрации
      if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
        this.error = 'Пароли не совпадают';
        this.loading = false; // Сбросить флаг загрузки
        return;
      }

      // Подготовка данных для отправки
      const payload = {
        email: this.form.email,
        password: this.form.password
      };

      // Выбор URL в зависимости от режима (вход или регистрация)
      const url = this.isLogin
          ? 'http://gotovo-web.ru/api/auth/login'
          : 'http://gotovo-web.ru/api/auth/register';

      try {
        // Отправка запроса на бэкенд
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Успешный ответ от сервера:', data);
          // Сохранение токена в localStorage (если он возвращается)
          if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Токен сохранен в localStorage');
          }
          // Перенаправление или обновление состояния (в данном случае просто сообщение)
          alert(this.isLogin ? 'Успешный вход!' : 'Успешная регистрация!');
          this.resetForm(); // Очистить форму после успешного действия
        } else {
          const errorData = await response.json();
          this.error = errorData.message || 'Ошибка при отправке запроса';
        }
      } catch (err) {
        console.error('Ошибка сети:', err);
        this.error = 'Произошла ошибка при подключении к серверу';
      } finally {
        this.loading = false; // Всегда сбросить флаг загрузки
      }
    }
  }
};
</script>