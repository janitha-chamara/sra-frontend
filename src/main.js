import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import "./assets/tailwind.css";
import router from "./router";
import Highcharts from "highcharts";
import VueHighcharts from "vue-highcharts";
import "./plugins/axios";

createApp(App)
  .use(router)
  .use(Quasar, quasarUserOptions)
  .use(VueHighcharts, { Highcharts })
  .mount("#app");
