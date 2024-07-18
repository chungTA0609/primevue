import { createApp } from "vue";
import "./style.css";
import PrimeVue from "primevue/config";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue, {
  unstyled: true,
});
app.mount('#app')