import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

async function enableMocking() {
    if (!import.meta.env.DEV) return;

    const { worker } = await import("./mocks/browser");
    await worker.start({
        onUnhandledRequest: "bypass",
    });
}

enableMocking().then(() => {
    createApp(App).use(createPinia()).use(router).mount("#app");
});
